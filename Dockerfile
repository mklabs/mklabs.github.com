FROM ubuntu:12.04

#Install Ruby
RUN apt-get update
RUN DEBIAN_FRONTEND=noninteractive apt-get -y install ruby1.9.1 ruby1.9.1-dev make nodejs npm

#Pygments doesn't seem to want to work regardless of version installed
RUN gem install pygments.rb

#Install Jekyll
RUN gem install jekyll rdiscount

# Setup where jekyll will run.
VOLUME ["/data"]
WORKDIR /data

# ADD . /data

EXPOSE 4000

CMD ["jekyll", "serve", "--watch"]
