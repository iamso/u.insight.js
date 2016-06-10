
;(function($, window, document, undefined) {
  'use strict';

  var pluginName = 'insight',
      defaults = {
        fn: null,
        classIn:      'insight',
        classAbove:   'insight-above',
        classBelow:   'insight-below',
        classLeft:    'insight-left',
        classRight:   'insight-right',
        container:    $(window),
      };

  function InSight(element, options) {
    this.el = element;
    this.$el = $(this.el);
    this.options = $.extend({}, defaults, options);
    this._defaults = defaults;
    this._name = pluginName;
    this.init();
  }

  InSight.prototype = {

    init: function() {
      var _this = this;
      var el = _this.el;
      var $el = _this.$el;
      var options = _this.options;

      function handler(e, rect, wWidth, wHeight, insight, position) {

        try {
          rect = el.getBoundingClientRect();
          wWidth = options.container.width();
          wHeight = options.container.height();
          insight = (
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
          position = {
            above: rect.top < 0 && rect.bottom <= 0,
            left: rect.left < 0 && rect.right <= 0,
            right: rect.left >= wWidth && rect.right > wWidth,
            below: rect.top >= wHeight && rect.bottom > wHeight,
          };

          if (insight) {
            $el.addClass(options.classIn);
          }

          if (position.above) {
            $el.addClass(options.classAbove);
          }
          else {
            $el.removeClass(options.classAbove);
          }

          if (position.below) {
            $el.addClass(options.classBelow);
          }
          else {
            $el.removeClass(options.classBelow);
          }

          if (position.left) {
            $el.addClass(options.classLeft);
          }
          else {
            $el.removeClass(options.classLeft);
          }

          if (position.right) {
            $el.addClass(options.classRight);
          }
          else {
            $el.removeClass(options.classRight);
          }
        }
        catch(e) {}
        options.fn && options.fn.apply(el, [insight, position]);
      }

      $(window)
        .off('DOMContentLoaded load resize', handler.bind(_this))
        .on('DOMContentLoaded load resize', handler.bind(_this));
      options.container
        .off('scroll', handler.bind(_this))
        .on('scroll', handler.bind(_this))
        .trigger('scroll');
    }
  };

  // A really lightweight plugin wrapper around the constructor,
  // preventing against multiple instantiations
  $.fn[pluginName] = function(options) {
    return this.each(function() {
      if (!$(this).data(pluginName)) {
        $(this).data(pluginName, new InSight(this, options));
      }
    });
  };

})(ujs, window, document);
