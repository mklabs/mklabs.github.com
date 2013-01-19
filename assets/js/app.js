//= require ./outline

(function(loc) {
  var url = loc.pathname || '';
  var host = loc.host;
  if(!document.querySelectorAll) return;

  var nav = $('.js-paths');
  if(!nav) return;

  var parts = url.split(/\//);

  var current = host + '/';
  parts.forEach(function(path) {
    if(!path) return;
    var a = document.createElement('a');
    current += path + '/';
    a.href = '//' + current;
    a.innerHTML = path;
    nav.appendChild(a);
  });

  var outline = new Outline($('.outline'));
  outline.render();

  // querySelectorAll wrapper
  function $(sel, context) {
    context = context || document;
    return context.querySelector(sel);
  }

  function $$(sel, context) {
    context = context || document;
    return Array.prototype.slice(context.querySelectorAll(sel));
  }

})(location);
