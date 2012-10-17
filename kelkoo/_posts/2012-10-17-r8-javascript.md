---
layout: post
title: R8 JavaScript
published: false
---

**{{ page.title }}** written in markdown.


R8 JavaScript
=============

1. Conventions & Coding Guidelines
----------------------------------

To be defined.


2. Workflow
-----------

To be defined.

Needs:

- Template precompilation.
- Routes Hash generation (from Symfony's routing configuration files)

3. R8 Backbone Integration
--------------------------

R8 Codebase remains, but we introduce Backbone / Underscore as our
front-end MVC foundation.

The whole base of this new architecture is contained within
`web/s/js/phoenix/modules`

The relevant files are:

- [**modules/kelkoo.js**](http://subversion.corp.kelkoo.net/websvn/wsvn/engineering/R8/colibri/trunk/src/main/www_root/htdocs/web/s/js/phoenix/modules/kelkoo.js)
The main kelkoo gluing "framework" on top of Backbone and
module-driven structure.

- **modules/app.routes.js**
The list of URL <=> module/action definitions. This file should never be
manually edited, it is generated from Symfony's routing.yml files.

- [**modules/app.js**](http://subversion.corp.kelkoo.net/websvn/wsvn/engineering/R8/colibri/trunk/src/main/www_root/htdocs/web/s/js/phoenix/modules/app.js)
The main application router. This is where we define the mapping between
generated URL definitions and Backbone routing system.

- [**modules/templates.js**](http://subversion.corp.kelkoo.net/websvn/wsvn/engineering/R8/colibri/trunk/src/main/www_root/htdocs/web/s/js/phoenix/modules/templates.js)
This file is the result of any pre-compiled template needed in our
JavaScript modules and Backbone views.

### tl;dr

Here is the minimal documentation on the current R8 Backbone setup. Feel
free to also check out next sections for more detailed information.

- Applications should be divided into independent modules.
- Each modules should know about the sandbox only, and never access
  other modules.
- Re-usable code should be organized into widgets / components, and are
  special kind of modules (under `modules/ui/*`).
- The Application Router is responsible of starting the appropriate
  modules for a given page.
- If Views within a Module or Widgets needs templates, then raw template
  should be pre-compiled and appended to `modules/template.js`
- The "front-controller" checks if, for a specific URL, a module/action
  mapping is defined, and if so attempts to start the module.

The `modules/app.js` file is defining a `Backbone.Router`, our
Application router singleton.

Its role is to map particular URL patterns to a given module and start
it appropriately. URL patterns of the `routes` hash is close, if not
identical, to the one used in Symfony's `routing.yml` file.

It uses `kelkoo.routes` (which is an Hash of URL <=> module/action
mappings, generated from Symfony's routing configuration file) to
initialize the Backbone Router appropriately.

As of now, starting a module consists in only invoking its `.init()`
method.

The page should include, in this order.

- Both `modules/kelkoo.js`.
- Both `modules/app.routes.js` and `modules/app.js`.
- All JavaScript templates (JST) in `modules/templates.js`.
- All UI Modules (Widgets or Components in `modules/ui/*`) (Order may matter)
- All our application modules in `modules/**/*` (Order doens't matter)

**Notes on templates**: If you need HTML templates to render fragment of
HTML strings within your view. You have to pre-compile them and then use
the `JST.templateName` pre-compiled function.

---

### Philosophy

*todo: Check out http://addyosmani.github.com/aura/*

We'll adopt a variation of [Organizing Your Backbone.js Application With
Modules](http://weblog.bocoup.com/organizing-your-backbone-js-application-with-modules/)
blog post from @bocoup.

> The rest of your application code should be divided into modules that
> can live under their own modules directory. A module is an
> encapsulated group of structures (for the purposes of our post,
> Backbone structures) that work cohesively to provide a subset of
> functionality in your application.

The idea here is to adopt this approach and map the organization of our
JavaScript to the Symfony modules structure.

In term of file organisation, for instance, the associated JavaScript
for a `levelTwo` module and `index` action, should be in
`s/js/phoenix/modules/levelTwo/index.js`. And it should define its
`kelkoo.module()` under the appropriate namespace:
`kelkoo.modules('levelTwo/index')`

**Note** The same apply to CSS, CSS for a given `<module>/<action>`
should live in `s/css/phoenix/modules/<module>/<template>`.

We generate (using a task, manual step to generate) a dictionary of URL
patterns mapping the associated `module:action` from Symfony's
configuration file. This dictionary is stored as `kelkoo.routes` on the
JavaScript side.

Each URL pattern is then registered in Backbone, they all invoke the
same method. This method is responsible of "requiring" the appropriate
module for each URL (based on the routes <=> module/action mapping),
and invoke its `init()` method.


### Module Boilerplate

The typical module boilerplate looks like this, given we need to create
a new module for `indexPhoenixSuccess.php` template in `levelTwo`
modules:

{% highlight js %}
// In s/js/phoenix/modules/levelTwo/index.js

// sandbox is a reference to the module created at the bottom of the wrapping
// function. You can choose w/e name you want.
(function(sandbox) {

    // Any init method attached to the module will be triggered on
    // DOMContentLoaded event (`$(document).ready`). Use it to
    // instantiate your Backbone app or any appropriate logic for this
    // module.
    sandbox.init = function() {
        console.log('L2 levelTwo initialized');
    };

// Module name: levelTwo/index (or maybe just levelTwo)
})(kelkoo.module('levelTwo/index'));
{% endhighlight %}

### Kelkoo "framework"

Kelkoo "framework" is really just a way of naming that new architecture.

It contains a multi-tiered architecture, consisting of:

- An Application Core
- A Sandbox
- Components (or Widgets)
- Modules

#### Application Core

**File** `modules/kelkoo.js`

* Provides the ability to manage a modules's lifecycle (creation, start)

* Exposes Publish/Subscribe functionality that can be used for decoupled
communication between parts of our application

#### The Sandbox

* Provides a limited, lightweight API layer on top of the Core for the
  rest of an application to communicate through.

Possible additions: The Sandbox may include a permissions layer,
allowing you to configure permissions for widgets such as whether a
specific widget has the right to render to the page etc.

#### Components (or Widgets)

* Components represent a complete unit of a page. They could be a
  calendar, a news block, a todo list or anything else.

* In Backbone.js terms, widgets are composed of Models, Views,
  Collections and Routers as well as any templates needed for the widget
  to rendered.

* Widgets should be developed such that any number of instances of them
  could exist on a page in harmony.

* Publish/Subscribe can be used to communicate between widgets.

#### Modules

* Any files within `s/js/phoenix/modules/*/*.js` falls into that
  category.
* Is a group of encapsulated structure working cohesively to provide a
  functionality.
* Naming convention is important, and they should follow closely the
  structure of Symfony's module.
* Must define an `.init()` method, that will be invoked by the
  AppRouter (our "front controller")
* Must not start their logic on their own, should be done in `.init()`
  (Instantiating the main View, Router, Whatever of the module)


