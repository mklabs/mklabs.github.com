(function() {
  $(function() {
    var ups = $('[class^="up-"]');
    ups.each(function(i, el) {
      el = $(el);
      var slide = el.closest('.slide');
      var classname = el.attr('class').split('-').slice(1).join('-');
      slide.addClass(classname);
    });
  });
})();
