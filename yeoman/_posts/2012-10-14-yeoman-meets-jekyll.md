---
layout: post
title: Yeoman meets Jekyll
---

*This post will go through the setup of a basic Jekyll website, with
configuration and adapters for Yeoman / Grunt combo. We'll enable and bridge
the LiveReload server of Yeoman with the auto-regeneration feature of Jekyll.
We'll also setup the bits of logics in both our project configuration and
custom tasks to adjust the build script to run on a Jekyll directory
structure.*

Today, I've decided to play with Jekyll a bit. This was once I stumbled upon
the new Github Page generation thing, with all these new shiny themes. I
thought "Would be cool to set this up as yeoman generators, probably as remote
templates?"

I also wanted the generator to generate from a minimalist and efficient
starting point for Jekyll. So, I started building the thing on
[@necolas](https://github.com/necolas)'
[jekyll-boilerplate](https://github.com/necolas/jekyll-boilerplate) project.

Here is what the result look like:


    Usage:
      yeoman init jekyll LOCATION [options]

    Options:
      -h, --help       # Print generator's options and usage
                       # Default: false
          --theme      # Choose a theme from the following GitHub page templates:
                         - orderedlist/modernist
                         - orderedlist/minimal
                         - mattgraham/Midnight
                         - jsncostello/slate
                         - mattgraham/Leap-Day
                         - jonrohan/time-machine-theme
                         - cameronmcefee/merlot
                         - broccolini/dinky
                         - tactile
                       # Default: tactile
          --gruntfile  # Gruntfile to be invoked
                       # Default:

    Description:
        Yeoman generator based on @necolas' Jekyll Boilerplate.

        This generator will simply fetch the latest state of jekyll-boilerplate's
        master branch (unless the content is already cached by yeoman at
        `~/.yeoman/cache/necolas/jekyll-boilerplate)` in the `location` argument
        provided.

    Arguments:

        - location: Defaults to current working directory. Base directory to copy
                    the content of the remote template.

    Tasks:

        This generator will also generate:

          - a basic Gruntfile if none were found
          - a tasks/ directory with:
            - server: Override the built-in server command to run Jekyll instead.

    Example:

        yeoman init jekyll

        This will create:
            .
            |-- .gitignore
            |-- README
            |-- _config.yml
            |-- _layouts
            |   |-- default.html
            |   |-- post.html
            |-- _includes
            |-- _posts
            |   |-- 1970-01-01-placeholder-post.md
            |-- index.html


Pretty sweet right?

The actual console output:


       invoke  jekyll
       create    .gitignore
       create    _config.yml
       create    _includes/.gitignore
       create    _layouts/default.html
       create    _layouts/post.html
       create    _posts/1970-01-01-placeholder-post.md
       create    index.html
       create    README.md
        force    _layouts/default.html
       create    stylesheets/print.css
       create    stylesheets/pygment_trac.css
       create    stylesheets/stylesheet.css
       create    tactile.html
       invoke      gruntfile:jekyll

    Scanning the directory structure...OK


    Please answer the following:
     Directory - app (app)
     Directory - temp (temp)
     Directory - dist (dist)
     Directory - scripts (scripts)
     Directory - styles (stylesheets)
     Directory - vendor (scripts/vendor)
     Directory - images (images)
     Do you need to make any changes to the above before continuing? (y/N)

    Writing local .yeomanrc file with following values: {
      "app": "app",
      "temp": "temp",
      "dist": "dist",
      "scripts": "scripts",
      "styles": "stylesheets",
      "vendor": "scripts/vendor",
      "images": "images"
    }

       create        .yeomanrc
       create        Gruntfile.js



Directories
-----------

One of the most requested feature request in Yeoman is the ability to define
alternate directory structure. The team made some decisions you might disagree
on. Some like it called `js` where others like it as `scripts`. Others will
want it to be `assets/javascript`.

We know we have to be more flexible

Anyway, we weren't not really that far from being able to support this feature,
the build script and the tasks involved all work on configuration values read
from the application Gruntfile.

It's just that it wasn't easy at all to decide to change one of these
key-directories, since they were used throughout the entire Gruntfile, and
sometimes even hard-coded in some of our tasks.

I'm glad to be able to say that better configuration and support for build /
server and generators are on the way, and so far, it has proven very efficient.
I was able to setup some very fancy directory structure.

The key paths identified so far:

- app: path to the app directory, defaults to app/.
- temp: path to the temporary directory, defaults to temp/.
- dist: path to the final output of the build command, defaults to dist/.
- test: path to the tests directory, where the unit tests and the test
  framework runner can be found.
- components: path to the components directory, where stuff installed via
  package manager should be.

Relative to app

- scripts: path to the scripts directory, defaults to scripts/
- styles: path to the scripts directory, defaults to styles/
- vendor: path to the vendor directory, defaults to sciprts/vendor

Back to the generator
--------------------

`Scanning the directory structure...OK`

Maybe you noticed the message in the previous console outputs. The
`gruntfile:jekyll` generator is an hook of `jekyll`. Its role is to setup the
necessary Grunt configuration, and do a best-guess on the key paths that Yeoman
expects.

The idea of scanning the directory structure consist in trying to locate
filename patterns we expect from a certain kind of file (like `.js` or
`.coffee` files for JavaScript sources). This is done thanks to the globbing
ability of [`grunt.file`
API](https://github.com/gruntjs/grunt/blob/master/docs/api_file.md), we then
reduce the results into a list of unique directory names. If the set of
detected directories is composed of just a single entry, then we assume it
should be a good candidate for that directory.

This goes along the prompt of each directory value. Typing `?` on any questions
asked will output more informations about this specific directory. Ex:

     Directory - app (app) ?
    error:  Invalid input for Directory - app
    error:  The "app" directory is the most important directory, and is where your
    source files are located.

    `scripts`, `styles` and `vendor` are all resolved relative to this directory.

    A good place for that is simply `app/` (default value), but if you want the
    root of your repository to be the root of your application, you can choose to
    set this to `./`

    Defaults to `app/`.

     Directory - temp (temp) ?
    error:  Invalid input for Directory - temp
    error:  The "temp" directory is used mostly with the build and server commands.

    It acts as a mirror of your "app" directory, compile-ish steps like coffee,
    compass or even rjs should be configured to output in this directory.

    The server task when creating the HTTP server will use both directories to
    serve static files, from both locations. Order matters, and the "app" directory
    is usually configured prior to the "temp" one, meaning that the server will
    respond with the file in "app" when the same file appears in both direcory.

    Additionally, this directory is used by the build task, to copy the files in
    the "app" dir and optimize files in that temporary directory.

    Defaults to `temp/`.


     Directory - dist (dist) ?
    error:  Invalid input for Directory - dist
    error:  The "dist" directory is only used at the end of the build task, simply copying
    the "temp" directory to the "dist" one.

    Defaults to `dist/`.


     Directory - scripts (scripts) ?
    error:  Invalid input for Directory - scripts
    error:  The "scripts" directory is resolved relative to the "app" one.

    This is where the JavaScript files of your application are located.

    This path is used namely with the lint, coffee, and rjs task (every task that
    is looking up for JS sources)

    Defaults to `scripts/`.


     Directory - styles (stylesheets) ?
    error:  Invalid input for Directory - styles
    error:  The "styles" directory is resolved relative to the "app" one.

    This is where the raw CSS of pre-processor files of your application are
    located.

    Namely used with the compass.

    Defaults to `styles/`.

    We have detected the following directory as a good candidate: stylesheets
    Files:
     - stylesheets/print.css
     - stylesheets/pygment_trac.css
     - stylesheets/stylesheet.css


     Directory - vendor (scripts/vendor) ?
    error:  Invalid input for Directory - vendor
    error:  The "vendor" directory is resolved relative to the "app" one.

    This is where the third-party JavaScript files of your application are located.

    Usually called scripts/vendor/ (defaults) or js/libs

    You should map the value of "scripts" directory with the value of "vendor", ex.
    scripts/ and scripts/vendor or js/ and js/libs.

    Defaults to `scripts/vendor`.


## Commands

To enable below commands, the project Gruntfile should load the plugin tasks,
with the standard procedure of calling `grunt.loadNpmTask()`

I've bundled in this package tasks that aims at integrating Jekyll with
Yeoman's workflow. Or Yeoman with Jekyll's workflow, this works just as well
in this direction.

```js
grunt.loadNpmTasks('yeoman-jekyll');
```

### Run the build script

    yeoman build

This will compile the Jekyll website in the intermediate directory `_temp/`, go
through yeoman build script, and finally copy the result over `_site/`


### Preview server

    yeoman server

This will run Jekyll with the default configuration setup in `_config.yml`.
Both `auto` and `server` options should be turned on. Jekyll will watch for
modifications and rebuilt automatically in `_site`.

Yeoman / Grunt are configured to watch any files with `_site` directory, and
will start a LiveReload compatible server on port `35729`.

Install the LiveReload extensions, visit `http://localhost:4000` (default
hostname / port, you change it in the `_config.yml`), click the
LR icon, connection should establish and you can then enjoy the live reloading
of your Jekyll website.

## How these commands are implemented

I feel like it would be handy, or at least appropriate, to try to explain how
and where you can extend, and more specifically override part of Yeoman's feature.

In our Jekyll use case, the first thing that comes in mind is enabling `yeoman
server` to run a local Jekyll instance as if we were running `jekyll --server`
directly.

Then, we'll want to enable the watch system, making Jekyll regenerate when
necessary, and finally it would be shiny if we can support and bridge into the
LiveReload feature of Yeoman.

Turns out that it wasn't not that difficult.

### Server - Spawn, oh sweet Spawn

The goal of this task is to override yeoman's server task to run `jekyll`
instead.

With the default config in `_config.yml`, both server & auto should be turned
on. Jekyll will generate the website & start up a local server on port 4000
(also configurable in `_config.yml`) `auto` is here to watch for changes and
regenerate if necessary.

Here we alias the `server` task to run our own set of tasks.

{% highlight js %}
grunt.registerTask('server', 'jekyll:config jekyll:server watch:jekyll');
{% endhighlight %}

The actual server task.

{% highlight js %}

grunt.registerTask('jekyll:server', 'Jekyll server task', function() {
  var jekyll = grunt.util.spawn({
    cmd: 'jekyll'
  }, function(err, out, code) {
    if(err && code !== 0) {
      console.error(out.stdout);
      process.exit(0);
    }

    cb(err);
  });

  jekyll.stdout.pipe(process.stdout);
  jekyll.stderr.pipe(process.stderr);
});

{% endhighlight %}

As you can see, it's as simpler as it can get. The configuration is managed by
`_config.yml`, the task simply delegate the server implementation over Jekyll.

We also ensure (as the first task invoked in `jekyll:config`) proper config in
Gruntfile. In case there are no config for jekyll, this sets up the default
watch configuration. We watch for any changes within `_site`, and notify
connected clients via the reload task and LiveReload mechanism.

{% highlight js %}
var watch = grunt.config('watch.jekyll');
// already configured, noop.
if(watch) return;

grunt.config('watch.jekyll', {
  files: ['_site/**/*'],
  tasks: 'reload'
});
{% endhighlight %}

For LiveReload support, we also configure and initialize the "reactor", with a
very basic HTTP server. Its main role is to enable the connection via
LiveReload browser extensions, we don't want to use that server for browsing
only to allow the extensions to establish connection.

{% highlight js %}
var livereload = 'https://raw.github.com/livereload/livereload-js/master/dist/livereload.js';
var server = http.createServer(function(req, res) {
  var url = parse(req.url);
  if(url.pathname === '/livereload.js') {
    return request(livereload).pipe(res);
  }

  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end();
});

var port = grunt.config('server.port') || 35729;
// ensure proper instantiation of the reactor object
var reactor = grunt.helper('reload:reactor', {
  server: server,
  apiVersion: '1.7',
  host: grunt.config('server.hostname') || grunt.config('server.host') || 'localhost',
  port: grunt.config('server.port') || 35729
});

server.listen(port, function() {
  grunt.log.ok('LiveReload server listening on ' + port);
});
{% endhighlight %}

Here is for the server part. `jekyll:config` is responsible of setting up the
necessary config, and proper initialization of the LiveReload mechanism.
`jekyll:server` replaces the usual `server` task by delegating the HTTP server
part completely to Jekyll.


### Build - Matter of configuration

Since Jekyll is all about generating static files, and that Yeoman is all about
working on static websites (or application, read pure frontend app / no dynamic
server-side thingy), it wasn't that difficult either.

Well, maybe a little, we can certainly improve a lof of stuff in this area.

The idea of `yeoman build` in the typical Jekyll setup is:

1. Build & compile the Jekyll website as usual: `jekyll
   --no-auto --no-server`, with output destination -> temp.
2. Change the working directory to temporary directory (where
   the Jekyll website has been compiled)
3. DO ALL THE STUFF
4. Cd back to original directory
5. Do the actual copy from "temp" to "dist"

This was done by overwriting the `mkdirs` task to run, once
again, Jekyll instead, and use it as the `cp` helper of choice
(with the `jekyll <path to source> <path to write generated
site>` pattern)

The final result in `_site/` should be the Jekyll result of `.`,
with the full set of optimizations delivered by Yeoman (css/js
concat & minified, filenames revved, usemin blocks & references
updates, if images, then they are processed through optipng
etc.)

You then need to take of the very last step: deployment.

## Conclusion

The exercise is interesting because it demonstrates how one can
completely rewrite and reimplement some of the built-in tasks
involved in Yeoman's commands, such as `build` and `server`.
Most of this flexibility is not coming from Yeoman, but from
Grunt which is really the foundation of Yeoman.

There is a lot of development environment, a lot of different
setup, a lot of different HTTP server or backend framework.
Yeoman won't be able to support them all, but he might try...

