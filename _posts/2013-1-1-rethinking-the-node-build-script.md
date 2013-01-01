---
layout: post
title: Rethinking the node-build-script
published: false
---

I would like to talk a bit about the node-build-script project, and what I have
in mind for the next major version and iteration.

It's been a year since [the very
commit](https://github.com/h5bp/node-build-script/commit/c42254c4be692dfb79f4ff41f48d0f592c22d99e)
on that project. During that time, a lot of stuff happened, among which the
realease and development process of [yeoman](http://yeoman.io/)

I've been lucky enough for being part of that project, which started on the
node-build-script base. A lot of efforts have been put into the
node-build-script at first, efforts than then shifted towards yeoman.

I've been working a lot on both project, a lot of thinking and energy have been
put this year on both.

I would now like to refocus on the node-build-script project, and approach the
concept of build script with a different approach.

## Abstracting away from build tool

Grunt is an awesome build tool, so node-build-script shifted from Cake to use
Grunt instead. And it was a good design choice.

I now would like to make a step back, and design the scripts and helpers
without any coupling to the chosen build tool.

Grunt would still remain the default build tool, but every "tasks" should be
able to be used with any kind of build tool, either it is Cake, Grunt or GNU
Make.

The overall layout:

    bin/      # binary file(s), exposing the tasks with raw commands.
    lib/      # main libary and implementation for every "taks"
    tasks/    # thin adapters for various Build tool (starting with Grunt tasks
              # and Make include files)
    test/     # test for the various components
    docs/     # generated documentation from source

Some part of the workflow will be made available through other npm packages
following that layout (livereload, templates precompilation, mocha phantomjs
runner)

## Being CI Compliant

An often underestimated aspect of frontend development is Continuous
Integration. I'm not speaking just about running unit tests (headlessly or
not), CI can be applied to a wide range of use case. And frontend is made of
not just JavaScript.

CSS and HTML are just as important and should be considered when thinking about
CI.

Continuous integration applied to frontend might goes accross a wide range of
use case:

- Static Anaysis (jshint, csslint, esvalidate)
- File Optimization (uglifyjs, sprockets)
- Automated Testing (mocha, casperjs)
- Performance focused test (confess, loadreport, yslow)
- Documentation (dox, docco)
- Report Results (xunit, html)

Popular CI systems like Jenkins or Teamcity allows you to publish reports, that
can be used to provide useful information about test resuts, such as historical
test result trend, a web UI for viewing test reports, tracking failures and so
on.

It's not enough to just exit the build with the appropriate exit code, failing
the build if necessary. We also need to generate reports, this means most of
the time generating xUnit XML reports.

Popular tools such as `jshint` or `mocha` allows you to generate reports, if
they don't they allow most of time the use of a custom reporter. So it's
important to not add too much layer of complexity between the user and the
underlying tool.

## Leverage Ruby

But it shouldn't be a blocker. The project should encourage the use of tools
like Sprockets and Compass and provides way to ease the process.

I'm seriously considering making Sprockets an important part of the process,
because it's such an awesome tool. The Rails Asset Pipeline is probably one of
the most effective and most simple way to deal with dependency managements for
CSS and JS.

Another good reason for me to try to push Sprockets as a first class citizen of
the build script is its really nice integration with bower

For those who don't wish to use Ruby, it should provide fallback to use
snockets or mincer instead.

## Tasks

These are the tasks I have in mind:


    min     # uglify-js2 with sourcemap generation enabled by default
    concat  # a simple interface to concat files
    css     # a simple task to minify CSS files through csso (no inline @imports)
    ...


The idea is that each tasks are really focused on doing a very small thing, but
doing it well.

For instance, the css task only deals with CSS minification, any concatenation
or `@imports` inlining must be done prior to the minification. It can be done
using pre-processors like Less, Stylus or Compass or using Sprockets.
