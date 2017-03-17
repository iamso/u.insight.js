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
      this.handler = this._handler.bind(this);
      $(window)
        .off('DOMContentLoaded load resize', this.handler)
        .on('DOMContentLoaded load resize', this.handler);
      this.options.container
        .off('scroll', this.handler)
        .on('scroll', this.handler)
        .trigger('scroll');
    },
    destroy: function() {
      $(window)
        .off('DOMContentLoaded load resize', this.handler);
      this.options.container
        .off('scroll', this.handler);
      this.$el.removeData(pluginName);
    },
    _handler: function(e, rect, wWidth, wHeight, insight, position) {
      try {
        rect = this.el.getBoundingClientRect();
        wWidth = this.options.container.width();
        wHeight = this.options.container.height();
        insight = rect.top < wHeight &&
                  rect.bottom > 0 &&
                  rect.left < wWidth &&
                  rect.right > 0;
        position = {
          above: rect.top < 0 && rect.bottom <= 0,
          left: rect.left < 0 && rect.right <= 0,
          right: rect.left >= wWidth && rect.right > wWidth,
          below: rect.top >= wHeight && rect.bottom > wHeight,
        };

        if (insight) {
          this.$el.addClass(this.options.classIn);
        }

        if (position.above) {
          this.$el.addClass(this.options.classAbove);
        }
        else {
          this.$el.removeClass(this.options.classAbove);
        }

        if (position.below) {
          this.$el.addClass(this.options.classBelow);
        }
        else {
          this.$el.removeClass(this.options.classBelow);
        }

        if (position.left) {
          this.$el.addClass(this.options.classLeft);
        }
        else {
          this.$el.removeClass(this.options.classLeft);
        }

        if (position.right) {
          this.$el.addClass(this.options.classRight);
        }
        else {
          this.$el.removeClass(this.options.classRight);
        }
      }
      catch(e) {}
      this.options.fn && this.options.fn.apply(this.el, [{
        target: this.el,
        insight: insight,
        position: position,
        rect: rect,
      }]);
    }
  };

  $.fn[pluginName] = function(options) {
    return this.each(function() {

      var $el = $(this);
      var inst = $el.data(pluginName);

      if(!inst) {
        inst = new InSight(this, options);
        $el.data(pluginName, inst);
      }

      else if (options === 'destroy') {
        inst.destroy();
      }

    });
  };
