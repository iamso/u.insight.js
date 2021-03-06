  'use strict';

  var pluginName = 'insight',
      defaults = {
        fraction:     0,
        fn:           null,
        classIn:      'insight',
        classAbove:   'insight-above',
        classBelow:   'insight-below',
        classLeft:    'insight-left',
        classRight:   'insight-right',
        container:    $(window),
        removeClass:  false,
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
      this.options.fraction = Math.max(Math.min(+this.options.fraction, 1), 0);
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
    _handler: function(e, rect, wWidth, wHeight, insight, position, data) {
      try {
        rect = this.el.getBoundingClientRect();
        wWidth = this.options.container.width();
        wHeight = this.options.container.height();
        position = {
          above: rect.top < 0 && rect.bottom <= 0,
          left: rect.left < 0 && rect.right <= 0,
          right: rect.left >= wWidth && rect.right > wWidth,
          below: rect.top >= wHeight && rect.bottom > wHeight,
        };

        if (this.options.fraction) {
          var heightFraction = Math.min(rect.height, wHeight) * this.options.fraction;
          var widthFraction = Math.min(rect.width, wWidth) * this.options.fraction;
          insight = (
                      (rect.top <= wHeight - heightFraction && rect.bottom > 0) ||
                      (rect.top < wHeight && rect.bottom >= heightFraction && rect.bottom <= wHeight)
                    ) &&
                    (
                      (rect.left <= wWidth - widthFraction && rect.right > 0) ||
                      (rect.left < wWidth && rect.right >= widthFraction && rect.right <= wWidth)
                    );
        }
        else {
          insight = rect.top < wHeight &&
                    rect.bottom > 0 &&
                    rect.left < wWidth &&
                    rect.right > 0;
        }

        if (insight) {
          this.$el.addClass(this.options.classIn);
        }
        else if (!insight && this.options.removeClass) {
          this.$el.removeClass(this.options.classIn);
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
      data = {
        target: this.el,
        insight: insight,
        position: position,
        rect: rect,
      };
      this.options.fn && this.options.fn.apply(this.el, [data]);
      return data;
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
