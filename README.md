u.insight.js
====
u.js plugin to check if elements are in viewport.

Usage
-----

This is a setup showing the default settings:

```javascript
u('selector').insight({
  fn: function(insight, position) {},
  classIn:      'insight',
  classAbove:   'insight-above',
  classBelow:   'insight-below',
  classLeft:    'insight-left',
  classRight:   'insight-right',
  container:    u(window)
});
```

License
-------

[MIT License](LICENSE)
