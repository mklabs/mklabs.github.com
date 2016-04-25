---
layout: post
title: ES6 node setup & Makefile template
published: true
---

Working on the next version of [tabtab][] (which was not updated for 2 years),
I decided to cleanup the old code and setup a new environment using modern
goodies like ES6 with babel.

Before stating, with little to no experience with ES6, I wondered how the
development would go with node and what is the state of native ES6 support
since the recent merge of [iojs][].

Babel is the tool of choice these days to transpile JS files written using ES6
syntax to ES5. Node's ability to run ES6 files is limited, and if you want full
features, you'd need to setup a build process like you would do client-side.

Turns out it's not that complicated. This post will walk you through that
process, with the setup of a simple Makefile to:

- **test** and launch Mocha or Ava
- **compile** runs babel with es2015 presets on a particular directory (usually lib/)
- **lint** runs eslint against repository
- **watch** Reruns the build on file change in lib/ or test/

### Make

I like Make. Quite a lot.

I like its conciseness and syntax. Makefiles don't have to deal with
complicated C projects, and when applied to simple tasks, it leads to a single
place where tasks are clearly defined, in a clean and straightforward way.

This can be adapted to other build tools like Grunt or Gulp, but it requires
dealing with intermediary plugins, or using various modules API. While it can
be quite powerful, the conveniency of regular CLI programs is quite valuable.

That's why npm scripts are so appreciated I think, but they tend to grow as
tasks gains in complexity (lots or arguments, etc.) as JSON is not a very good
language for very complicated tasks, while Make keeps its clear syntax and the
context of bash.

Make lacks a few things from npm scripts, namely the [`$PATH`][] manipulation
that prepends `./node_modules/.bin` directory to make any executable from npm
installed package available in scripts (but it can easily be fixed).

[`$PATH`]: https://www.nczonline.net/blog/2016/03/mimicking-npm-script-in-node-js/

#### Makefile

Since I wanted to keep this post short, here it is:

    test:
      mocha test/

    babel:
      babel lib/ -d src/

    lint:
      eslint --env es6 .

    build: babel test lint

    watch:
      watchd lib/**/* test/**/* bin/* -c 'bake build'

    all: build watch

5 tasks (or targets in Make terminology) are defined, with `build watch` as
default target (when make is executed without argument).

You'd need the following package.json dependencies:

```json
{
  "devDependencies": {
    "eslint": "^2.8.0",
    "mocha": "^2.4.5",
    "watchd": "github:mklabs/watchd",
    "babel-cli": "^6.7.5",
    "babel-preset-es2015": "^6.6.0"
  }
}
```

And run make with `PATH="./node_modules/.bin:$PATH" make` to prepend the
directory where commands used in the Makefile are. Setting up an alias for that
should be possible.

[Mocha]: https://mochajs.org/
[Ava]: https://github.com/sindresorhus/ava
[Babel]: https://babeljs.io/
[visionmedia/watch]: https://github.com/visionmedia/watch
[tabtab]: https://github.com/mklabs/node-tabtab
[iojs]: https://iojs.org/
[babel-node]: http://babeljs.io/docs/usage/cli/#babel-node

### Babel

[Babel][] is wonderful to transpile ES6 based code into its ES5 equivalent.

The watch target can rebuild on change when needed, but [babel-node][] is quite
handy to compile ES6 code before running it.

I really like the feedback and stack trace it provides on Syntax or parsing error:

    SyntaxError: /home/mk/src/mklabs/tabtab/src/index.js: Unterminated string constant (3:13)

          1 | "use strict";
          2 |
        > 3 | let foobar = ';
            |              ^
          4 |

It is a bit more elaborated than the regular one, and offers the ability to run
ES6 code without worrying about setting up a build process.

It is so handy that the I even changed `node` to run `babel-node` automatically via an alias.

`babel-node` and a `prepublish` npm script is often all you need to write ES6
based node package.

```json
{
  "main": "src/index.js",
  "scripts": {
    "start": "babel-node src/index.js",
    "prepublish": "babel lib/ -d src/"
  },
  "devDependencies": {
    "babel-cli": "^6.7.5",
    "babel-preset-es2015": "^6.6.0"
  }
}
```

and a `.babelrc` somewhere between the project directory and `~/` with:

```json
{ "presets": ["es2015"] }
```

### Quick scaffold

Here is the few commands to run to get started with this config:

		# package.json file
		$ curl https://gist.githubusercontent.com/mklabs/0f30c2c0520359676c65616efa93e7fd/raw/ef5327fb557306510b02bd139698c9d2771e057b/package.json > package.json

		# update deps
		$ npm i eslint mocha babel-cli babel-preset-es2015 --save-dev

		# Makefile
		$ curl https://gist.githubusercontent.com/mklabs/0f30c2c0520359676c65616efa93e7fd/raw/28ee0a810f6af96ce7d965c6d776c0ecdd596d0b/Makefile > Makefile

		$ mkdir -p bin lib test

Or clone the [gist]:

		$ git clone https://gist.github.com/0f30c2c0520359676c65616efa93e7fd.git package-name


[gist]: https://gist.github.com/mklabs/0f30c2c0520359676c65616efa93e7fd
