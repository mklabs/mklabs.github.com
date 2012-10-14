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

I also wanted the generator to generate from a minimalist and efficient starting
point for Jekyll. So, I started building the thing on @necolas'
[jekyll-boilerplate](https://github.com/necolas/jekyll-boilerplate)

point for Jekyll. So, I started building the thing on @necolas' [jekyll](https://github.com/necolas/jekyll-boilerplate)

### Authors and Contributors
You can @mention a GitHub username to generate a link to their profile. The resulting `<a>` element will link to the contributor's GitHub Profile. For example: In 2007, Chris Wanstrath (@defunkt), PJ Hyett (@pjhyett), and Tom Preston-Werner (@mojombo) founded GitHub.

about making the generator to act on on another repository
