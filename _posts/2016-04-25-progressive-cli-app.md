---
layout: post
title: Getting started with Progressive CLI Apps
permalink: getting-started-with-progressive-web-apps/
published: false
---

> This post does echo @addyosmani article on [progressive web app](https://addyosmani.com/blog/)

Will add more thoughs later on. But basically ...

## What is a Progressive CLI App?

- git
- npm

are all top notch CLI application with excellent integration in all OSes and various system.

They:

- have awesome completion feature, like being able to complete all loglvl only if you tab after `--loglvl <tab>`. This is impressive and super useful to discover the surface API of a CLI program. I learnt a lot, really fast when I installed bash-completion and the git bash script.
- have awesome documentation. "npm help hey" will return the number of occurences in the whole npm documentation. "npm help install" will launch a manpage generated from a markdown file. Same goes for git. On windows, where man is not available (not true anymore, see scoop.sh), the documentation will just open a new page on the default browser.
- are just awesome overall

A progressive CLI app, would be the concept of re-applying Web app concept to the CLI world.

- offline support - tiny modules with no to few dependencies. Ideal size would be below >5k. See 140-opts for a silly experiment / poc. Can npm pack them and distribute along the package.
- JS completion: letting tabtab (or other solutions, see npm completion.js file) do the work of speaking to various user shell. Note that it is now possible to have completions as well on Windows.
- fast startup & install, if any feature needs a package a bit heavy (say babel), it must adopt a require.resolve / catch pattern to load additional npm packages. Users would need to install both of them: npm i ava mocha-reporters -D. And probably be lazyly loaded to keep the startup time under 100ms (or so).
- ...


