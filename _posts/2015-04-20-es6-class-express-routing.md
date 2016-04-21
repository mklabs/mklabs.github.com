---
layout: post
title: ES6 Class based Express routing
published: true
---

Here is a little pattern I like when working on a little express application.

The idea is to store a mapping of `path:method` in a property, a bit like
Backbone does for `events: {}` in `Backkbone.View`s.

With the new ES6 class sugar, it gets even better.

### The routes hash

```js
routes: {
  '/':                    'homepage',
  '/profile':             'profilePage',
  'POST /profile/save':   'save'
}
```

The `POST :path` syntax is quite easy to understand, express needs two things
to define a route:

- An HTTP verb (GET, POST, PUT, ...)
- URL pattern to use for the routing

This is a way to define a specific verb, when it differs from the default
`GET`. This is similar to defining a click or mouseover event client-side,
syntax is close with Backbone.


```js
events: {
  "click .icon.doc"         : "select",
  "click .title .lock"      : "editAccessLevel",
  "mouseover .title .date"  : "showTooltip"
}
```

### Example

And here is a basic example, notice the `registerRoutes` function. This is
where the magic happens.

```js
// usage
var app = require('express')();
var routes = new Routes(app);

// Routes class
class Routes {

  // Defines routes definitions here
  get routes() {
    return {
      '/':              'index',
      '/list':          'list',
      'POST /create':   'create'
    };
  }

  constructor(app) {
    this.app = app;

    // could use this place to configure the express app
    this.app.use(require('express-middleware')());

    // actually register the routes to express
    this.registerRoutes();
  }

  // It goes through each route defition, figures out the verb/action to use
  // (default: get), the function to call to handle the request and registers
  // the whole for the given path.
  registerRoutes() {
    var routes = this.routes;

    Object.keys(routes).forEach((path) => {
      var method = routes[path];

      // 'VERB /' => parts = ['VERB', '/']
      var parts = path.split(' ');

      // If no second part, assume get verb
      var verb = parts[1] ? parts[0] : 'get';

      // and use first part as a pattern
      var path = parts[1] || parts[0];

      verb = verb.toLowerCase();

      // use express api to register the route
      this.app[verb](path, this[method].bind(this));
    });
  }

  // Routes

  index(req, res, next) {
    return res.send('Homepage!');
  }

  list(req, res, next) {
    return res.render('list', {
      stuff: ['f', 'o', 'o', 'b', 'a', 'r']
    });
  }

  create() {
    return next();
  }
}
```

### Router super class

Going one step further, let's refactor out the route registering implementation
into a super class.

```js
// Extend from this class to get the routing behavior, as long as you correctly
// pass in a valid Express application instance
class Router {

  get routes() {
    return {};
  }

  constructor(app) {
    this.app = app;
    if (!this.app) throw new Error('Missing app property');

    this.registerRoutes();
  }

  registerRoutes() {
    var routes = this.routes;

    Object.keys(routes).forEach((path) => {
      var method = routes[path];
      var verb = path.split(' ').length > 1 ? path.split(' ')[0] : 'get';
      verb = verb.toLowerCase();
      this.app[verb](path, this[method].bind(this));
    });
  }
}
```

And here's what your controller / actions would look like:

```
class Routes extends Router {

  get routes() {
    return {
      '/':              'index',
      '/list':          'list',
      '/create':        'create',
    };
  }

  // Routes
  list(req, res, next) {}
  index(req, res, next) {}
  create(req, res, next) {}

  // Just an utility helper to create a new instance. Totally not needed.
  static create(app) {
    return new Routes(app);
  }
}
```

The `server.js` file kicking in the app could be just a few lines.

```js
var app = require('express')();
require('./routes').create(app);
app.listen(3000);
```

Quite concise, with the conveniency of a real class. ES6 goodness ;)

This is merely a few lines, but I might push that to npm ...
