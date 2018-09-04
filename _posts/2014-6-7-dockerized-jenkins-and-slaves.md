---
layout: post
title: dockerized jenkins and slave
published: true
---

**Note** This is a WIP blog post, and quite old. Be warn ;)
I've been struggling with it quite a bit. The idea is to spawn up a
dockerized [jenkins](http://jenkins-ci.org/) along [with slaves to
execute the
builds](https://wiki.jenkins-ci.org/display/JENKINS/Distributed+builds).

I've stumbled upon the following articles and plugins, by searching `docker jenkins
slave`

- https://wiki.jenkins-ci.org/display/JENKINS/Docker+Plugin
- http://developer-blog.cloudbees.com/2014/03/the-docker-buildpublish-plugin-and.html
- https://wiki.jenkins-ci.org/display/JENKINS/Docker+build+publish+Plugin
- http://blog.loof.fr/2014/04/jenkins-meets-docker-round-1.html
- http://blogs.nuxeo.com/development/2014/02/docker-jenkins-cloud-provider/

Unfortunately, all those valuable resources are about using docker on
demand to provision jenkins slave on demand, as a jenkins cloud
provider.

My need is simpler, I just want to add and manage jenkins nodes (or
slaves) using dockerized environment from my local docker host.

Slaves won't be spawned per build or on demand, my need is about
provisioning a set of slaves and being able to connect Jenkins master to
each nodes.

The docker part I was missing was [docker links](https://docs.docker.com/userguide/dockerlinks/).

Here is a step by step guide.

## Step 1: Build & Start a dockerized Jenkins

In this section, we'll try to setup a Jenkins instance, without slaves
connected. Just the master (using the same host for building jobs)

Here, I'll just use
[aespinosa/docker-jenkins](https://github.com/aespinosa/docker-jenkins)
docker image, which worked just fine for me.

    $ docker run --name jenkins -d -P aespinosa/jenkins

A quick explanation of the various flags here:

- `--name jenkins` to name our docker container with `jenkins`.
  Otherwise, docker will randomly generate a name. Setting it up
  explicitly make working with it simpler.
- `-d` to specify we want it to run in the background.
- `-P` flags tells docker to map any required network ports (8080) inside our
  container to our host. This lets us view jenkins.

The `docker ps` command lets us view our started container and mapped
port:

    $ docker ps
    CONTAINER ID        IMAGE                      COMMAND                CREATED             STATUS              PORTS           NAMES
0ac22ebb4baa        aespinosa/jenkins:latest   java -jar /opt/jenki   59 minutes ago      Up 59 minutes       0.0.0.0:49154->8080/tcp   jenkins

Accessing `http://localhost:49154` tells us it is working as expected.

## Step 2: Build & Start a dockerized ssh service

Fortunately, the docker documentation has a guide to do just that: [Dockerizing an SSH service](https://docs.docker.com/examples/running_ssh_service/)

So we'll reuse the same Dockerfile, build the image and ssh into the
container.

We're changing the Dockerfile a little bit to install a JDK
(openjdk-7-jdk package below) and add a `jenkins` user (with
`jenkins:jenkins` as credentials to ease the setup but copying over a
private key is recommended)


    FROM     debian
    MAINTAINER Thatcher R. Peskens "thatcher@dotcloud.com"

    # make sure the package repository is up to date
    RUN apt-get update

    RUN apt-get install -y openssh-server
    RUN mkdir /var/run/sshd

    # Install JDK 7 (latest edition)
    RUN apt-get install -y --no-install-recommends openjdk-7-jdk

    # Add user jenkins to the image
    RUN adduser --quiet jenkins

    # Set password for the jenkins user (you may want to alter this).
    RUN echo "jenkins:jenkins" | chpasswd

    EXPOSE 22
    CMD    ["/usr/sbin/sshd", "-D"]

To build, we'll run the following after cd'ing into the folder
containing the above Dockerfile:

    $ docker build --rm -t jenkins_slave .

The `--rm` flag to tell to Docker to remove intermediate containers
after a successful build, `-t jenkins_slave` to tag our image with a
name we can reuse, and `.` to tell docker to use the above Dockerfile.

    $ docker run -d -P --name test_slave jenkins_slave

We're naming it `test_slave`. A `docker ps` command will return the
mapped port, or `docker port test_slave 22`.

    $ docker port test_slave 22
    0.0.0.0:49155

On my setup, the mapped port is 49155, so let's try to open an ssh
session:

    ssh jenkins@localhost -p 49155

If everything went well, you sould be able to ssh into the built and
started container.

### Step 2.1: Fail at creating the Jenkins node from there

The next step would be to use the Jenkins UI to create a new "node" and
connect Jenkins with the slave.

You can access the node management page from `Manage Jenkins > Manage
nodes" or directly from http://localhost:49154/computer/ (adjust the
port depending on your mapped port)

![todo img](Jenkins nodes)
