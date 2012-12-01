---
layout: post
title: Sprockets, bower, uglifyjs2 & sourcemaps.
published: false
---

I'm writing this blogish thing right after dotjs.eu conference, that happened
november 30th. There were a lot of awesome speakers, and a lot of awesome
talks.

This is not a conference retrospective, I'm about to write down on paper the
results of some of the experiments I did lately related to build concatenation
/ minification and integration with package managers.

But one of the task from Vojni that I really liked, was about the idea.. of
combining ideas. And this experiment is all about that: combining ideas.

Nothing is really new, sprockets is there for quite some time now whereas bower
and uglifyjs2 just camed out. What can be interesting though, is how you can
combine and use them altogether.

Sprockets
---------

I had this need of finding an effective way to bundle and compile my JavaScript
assets. The Rails asset pipeline is probably one of the most advanced and well
crafted system to manage your frontend dependencies.

The practical implementation of the Rails asset pipeline relies on this really
neat tool called Sprockets (version 2), made by ...

I don't know why, but until really recently, I was pretty much convinced that
Sprockets was tied to ruby or rails project, and that I couldn't use it for my
own stuff (let's say an express app, a symfony app, a whatever app, etc.).

Turns out I was wrong.. plain wrong. And I never felt so good about being sooo
wrong.

Sprockets come with a little binary utility that can be used to precompile
assets (rails also has this rake precompile task), which means that it's not
tied to your app architecture or backend framework. You can use anything, as
long as you're delivering JS / CSS assets to the browser (most of the time,
this is what we do right?)

If you're not afraid of ruby, if you've started to use compass, then you should
really take a look and consider seriously to integrate Sprockets in your
workflow.

node and ruby are becoming a near-to-mandatory tool in the front-end
development toolbet. At least, in mine.

Bower
-----

Bower is this really nice little package manager designed primarily for
frontend.

Of course, it's not the first one, and we can already see some segmentation in
this field with the emergence of a lot of them (jam, volo, components, bower,
ender even if this one was there before. Eh, you can even use npm if you want
to, just use your own private registry).

But what set it aside to me (just as I would be keen to start using npm with
private registry for frontend assets), is that it's maybe the first one not
tied to any kind of build tool, or having an opinionated way of managing
dependencies (eg. commonjs vs amd).

It's then up to third party tools to consume the API provided by Bower, or just
perform the lookup themselves in the components/ directory, and then do their
stuff.

This is what Sprockets did exactly. Sprockets is even mentioned in bower's
readme.


UglifyJS2
---------

You might have heard this already, but uglifyjs has been entirely rewritten
from scratch, mostly for the support of sourcemaps.

If you're not familiar with sourcemaps, check out this article or this one.

Sprockets support for sourcemap is not there yet, but is definitely coming.
That being said, there might be some ways to still be able to compute
dependencies, get this list of concatenated files and pass them to uglify with
proper sourcemap options.

Let's do exactly that.

Using them altogether
---------------------

So, the weapon of choice are settled:

- Bower for package management.
- Sprockets for computing the asset graph.
- UglifyJS2 to concat, minify and generate the sourcemap.

Sprockets can minify (and a lot more) the generated bundle, but we want
sourcemap, so until sourcemap support is officially added to Sprockets, we'll
delegate the concat / minification process to uglify instead.

I cannot stress enough how good Sprockets is, and how simple it is to grasp at
the same time.

Since quite some time now, other communities than Ruby used to rely on tools
like RequireJS, and its optimizer, or more recently commonjs preprocessor tools
like browserify or component-builder (part of component(1))

These tools are great (especially commonjs preprocessors, but as a nodejs
developer, I've learned to love this), but Sprockets has a different approach.
It relies on this very simple but brilliant concept of "directives", where
simple comments like `// = require './awesome-app'` gets parsed and the content
of that required file is simply inserted there. Couple that with
"preprocessors" and you have a very powerful build chain, actually something
really close to the Rails asset pipeline (which in my opinion is what put Rails
aside in term of front-end development).

### Sprocketize / Bowerize

It gets even better when you figure out that bower installed package are
resolved just well.

You need a bit of configuration though, not much.

Sprockets needs you to specify the load path, under which paths should
Sprockets look for assets, when you require them.

You can do using the `-I` or `--include` options, that you can put once and for
all on a local `.sprocketsrc` file. This file should look like this:

    -I ./
    -I ./components

We're just saying to sprockets to consider the working current directory, also
appending that special `components/` directory to the same loadpath.

Sprockets has built-in logic to properly handle bower package (it parses
component.json files and `main` entries), and it works pretty well.

So, what if I want to bundle up together, let's say jQuery, Backbone and underscore.

All we would need to do, is to:

Install the packages

    # or put them into your project component.json file, then just run bower install
    # append a --save flag to automatically add them.
    $ bower install jquery backbone underscore

Specify the dependency in your application main entry point (often called your
manifest file), no manual scripts tag wiring:

    // = require jquery
    // = require underscore
    // = require backbone
    // = require ./local-stuff

    console.log('Testing out Sprockets & Bower');
    console.log('Its like bread and butter');

The ordering still matters, nothing crazy with that or nothing new. Of course,
if one of the required files, has itself some requirements, sprockets will
parse each line and if it finds a new directive, it'll handle them

One of the main benefit of Sprockets over other solutions is that it doesn't
require any changes to the library code. No need to do crazy feature detection
in each library, or do any kind of source transformation.

So, to generate our new file, we just need to run sprockets:

    # assuming you have the .sprocketsrc file
    sprockets scripts/manifest.js > scripts/bundle.js

The Sprockets helper script can generate from multiple files but requires us to
specify a `-o` or `--output` directory. When working with from single file a
single file, the script will output to stdout, so we simply redirect the output
at the desired location.

Sprockets can also generate md5-based filename automatically for you.

Simple, effective, awesome.

### Using UglifyJS

Of course, sprockets can minify your JavaScript, but is still using the first
verison of uglifyjs. While the sourcemap support is on the way, we'll proceed a
bit differently.

The idea is to put


So the final command is something like:

	uglifyjs2 $(sprockets-concat scripts/manifest.js) --source-map scripts/manifest.js --source-map-root / > scripts/bundle.js
