---
layout: post
title: Sprockets, bower, uglifyjs2 & sourcemaps.
published: false
---

I'm about to write on the results of some of the experiments
I did lately related to build concatenation / minification and
integration with package managers.

Nothing is really new, sprockets is there for quite some time now
whereas bower and uglifyjs2 just camed out. What can be interesting
though, is how you can combine and use them altogether.

Sprockets
---------

The Rails asset pipeline is probably one of the most advanced and well
crafted system to manage frontend dependencies.

It's efficient, pragmatic and simple. It relies on a set of *directives*
like `require` or `require_tree`.

Sprockets come with a little binary utility that can be used to precompile
assets (rails also has this rake precompile task), which means that it's not
tied to your app architecture or backend framework. You can use anything, as
long as you're delivering JS / CSS assets to the browser.

Unlike browserify or requirejs, it relies on the global scope, but
that's sometimes just what I need. Maintaining an old codebase is one of
this use case where rewriting a bunch of JS files to adhere to the
CommonJS or RequireJS convention is not possible.

Sprockets is using ruby and is integrated into Rails. If you're looking
for a node alternative, [mincer](https://github.com/nodeca/mincer) is
pretty good.

Bower
-----

Bower is this really nice little package manager designed primarily for
frontend. It's not tied to any kind of build tool.

It's then up to third party tools to consume the API provided by Bower,
or just perform the lookup themselves in the `bower_components/`
directory, and then do their stuff.

UglifyJS2
---------

You might have heard this already, but uglifyjs has been entirely rewritten
from scratch, mostly for the support of sourcemaps.

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
really close to the Rails asset pipeline (which in my opinion is what makes Rails
so good in term of front-end development).

### Sprocketize / Bowerize

It gets even better when you figure out that bower installed package are
resolved just well.

You need a bit of configuration though, not much.

Sprockets needs you to specify the load path, which is then used by
Sprockets to lookup for assets, when you require them.

You can do so, using the `-I` or `--include` options, that you can put once and for
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

So the final command is something like:

  # TODO: redo the sprockets-concat script, cannot find it
	uglifyjs2 $(sprockets-concat scripts/manifest.js) --source-map scripts/manifest.js --source-map-root / > scripts/bundle.js


The `$(sprockets-concat scripts/manifest.js)` part outputs the list of
required assets as Sprockets would do, but only output their paths, in
the correct order.

    // = require jquery
    // = require underscore
    // = require backbone
    // = require ./local-stuff

becomes

    bower_components/jquery/jquery.js
    bower_components/underscore/underscore.js
    bower_components/backbone/backbone.js
    local-stuff.js

which is then used by uglify to concat and minify scripts/bundle.js
file, along with sourcemap.

The `sprockets-concat` script remains to be written, and I cannot find
the script I once written for this experiment. Whenever I have time to
redo it, or have the chance to find it in my gists, I'll update the post
accordingly.

## Related gists

- [https://gist.github.com/mklabs/3f8166edd0b6d796d347](https://gist.github.com/mklabs/3f8166edd0b6d796d347)
