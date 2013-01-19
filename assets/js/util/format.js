(function(exports) {

  var util = exports.util = exports.util || {};
  util.str = str;
  util.Str = Str;

  function str(pattern) {
    return new Str(pattern);
  }

  function Str(str, pattern) {
    this.pattern = pattern || /\{([^\}]+)\}/g;
    this.str = str;
    this.lookup();
  }

  Str.prototype.replace = function replace(placeholder, value) {
    this.str = this.str.replace(this.pattern, function(match, param) {
      if(param !== placeholder) return match;
      return value;
    });
    return this;
  };

  Str.prototype.lookup = function lookup() {
    var placeholders = this.str.match(this.pattern);
    placeholders.forEach(function(placeholder) {
      var method = placeholder.replace(/\{|\}/g, '');
      this[method] = this.replace.bind(this, method);
    }, this);

    return this;
  };


  Str.prototype.toString = function() {
    return this.str;
  };

})(this);
