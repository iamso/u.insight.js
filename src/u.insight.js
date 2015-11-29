
;(function(u, window, document, undefined) {
  'use strict';

  var pluginName = 'insight',
      defaults = {
        fn: null,
        classIn:      'insight',
        classAbove:   'insight-above',
        classBelow:   'insight-below',
        classLeft:    'insight-left',
        classRight:   'insight-right',
      };

  function InSight(element, options) {
    this.el = element;
    this._el = u(this.el);
    this.options = u.extend({}, defaults, options);
    this._defaults = defaults;
    this._name = pluginName;
    this.init();
  }

  InSight.prototype = {

    init: function() {
      var _this = this;
      var el = _this.el;
      var _el = _this._el;
      var options = _this.options;

      function handler(e) {

        var rect = el.getBoundingClientRect();
        var wWidth = window.innerWidth;
        var wHeight = window.innerHeight;
        var insight = (
          (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.top < wHeight &&
            rect.left < wWidth
          ) ||
          (
            rect.bottom > 0 &&
            rect.right > 0 &&
            rect.bottom <= wHeight &&
            rect.right <= wWidth
          )
        );
        var position = {
          above: rect.top < 0 && rect.bottom <= 0,
          left: rect.left < 0 && rect.right <= 0,
          right: rect.left >= wWidth && rect.right > wWidth,
          below: rect.top >= wHeight && rect.bottom > wHeight,
        };

        if (insight) {
          _el.addClass(options.classIn);
        }
        // else {
        //   _el.removeClass(options.classIn);
        // }

        if (position.above) {
          _el.addClass(options.classAbove);
        }
        else {
          _el.removeClass(options.classAbove);
        }

        if (position.below) {
          _el.addClass(options.classBelow);
        }
        else {
          _el.removeClass(options.classBelow);
        }

        if (position.left) {
          _el.addClass(options.classLeft);
        }
        else {
          _el.removeClass(options.classLeft);
        }

        if (position.right) {
          _el.addClass(options.classRight);
        }
        else {
          _el.removeClass(options.classRight);
        }

        options.fn && options.fn.apply(el, [insight, position]);
      }

      u(window).on('DOMContentLoaded load resize scroll', handler.bind(_this));

    }
  };

  // A really lightweight plugin wrapper around the constructor,
  // preventing against multiple instantiations
  u.fn[pluginName] = function(options) {
    return this.each(function() {
      if (!u(this).data(pluginName)) {
        u(this).data(pluginName, new InSight(this, options));
      }
    });
  };

})(u, window, document);
