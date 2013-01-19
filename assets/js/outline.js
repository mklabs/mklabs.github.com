(function(exports) {

  function Outline(el, opts) {
    opts = this.options = opts || {};
    this.el = el;
    this.main = document.querySelector(opts.lookup || 'body');
    if(!this.main) throw new Error('Unablet to find ' + opts.lookup);
  }

  Outline.prototype.render = function render() {
    if(!this.el) return;
    this.el.innerHTML = this.buildToc();
    return this;
  };

  Outline.prototype.buildToc = function buildToc() {
    this.headers = this.headers || this.$('h1,h2,h3,h4,h5,h6');

    return this.headers.map(function(el) {
      var lvl = (el.tagName.match(/h([1-6])/i) || [])[1];
      var txt = el.innerText;
      var ref = txt.replace(/[^\w]/g, '-');

      el.innerHTML = util.str('<a href="#{id}" id="{id}" class="octo-link">&#8618;</a> {text}')
        .id(ref)
        .text(txt);

      el.className += ' octo';

      return util.str('<a href="{href}" class="{classname}">{text}</a>')
        .href('#' + ref)
        .classname('lvl-' + (lvl || 1))
        .text(txt);
    }).join('\n');
  };

  Outline.prototype.$ = function $(sel) {
    return Array.prototype.slice.call(this.main.querySelectorAll(sel));
  };

  exports.Outline = Outline;

})(this);
