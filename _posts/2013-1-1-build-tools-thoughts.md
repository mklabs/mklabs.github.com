---
layout: post
title: build tools thoughts
published: false
---

Build tools are just command line API to trigger repetitive and commonly
used "tasks" within your project. They can be written in any language,
but most often they are tied to a particular platform and / or build
tool.

I'm putting down here some of the thoughts and principles I'm now trying to
apply when writing tasks and scripts.

- Abstract away from your build tool of choice.
- Write simple and standard script, in a UNIX like way.
- Whenever it make sense, try to leverage stdin / stdout.
- Write simple and thin "adapter" task.

The idea is that the tasks implementation themselves shouldn't have any
kind of coupling with the higher level build tool. These scripts should
be able to be used without any kind of build tool. You execute them,
giving them a list of arguments and options, and they produce an output.

The part related to each particular build tool should be thin and be
considered more as an adapter thing, only dealing with higher level API
and delegating the ground work to a particular library, or other
component.

Probably, a good trade-off is to let the build tool handle CLI arguments
and options, as well as file globbing and then pass all these
informations (the Hash of CLI options, Array of arguments and Array of
resolved files) to another API.

## Practical implementation

The typical layout for this kind of package is the following one:

```
.
├── bin
│   └── ...
├── lib
│   └── ...
├── package.json
├── readme.md
├── tasks
│   └── ...
└── test
    └── ...
```

The package.json:

- provides a main entry, that points to the API entry point
- provides a bin entry, regardless of build tools, exposing a bin file is
  a good idea (but shouldn't imply global install)

The tasks/ directory is used to provide the "tasks" implementation for various
build tool you choose to support (Grunt, Make, ...). These facades should be as
thin as possible, only dealing with options, CLI arguments, etc. that are
passed to the package API.

The library part shouldn't have any kind of coupling with the build tool(s), it
should be standard nodejs (you're of course free to use any npm packages).

The idea is to keep in mind that the tool you are building can be used with any
kind of built tool, either it is Grunt, Make, Cake, Jake or even Rake.

npm is pretty smart when it comes to binary files, you don't
have to install things globally to start using them. The local
`./node_modules/.bin` folder can be used by these build tools, maybe by putting
this path at the front of the `$PATH` environment variable (this works nicely
with Make for instance)
