u.insight.js
====
u.js plugin to check if elements are in viewport.

Usage
-----

This is a setup showing the default settings:

```javascript
u('selector').insight({
  fraction:     0,
  fn:           function(e) {},
  classIn:      'insight',
  classAbove:   'insight-above',
  classBelow:   'insight-below',
  classLeft:    'insight-left',
  classRight:   'insight-right',
  container:    $(window),
  removeClass:  false,
});
```

The callback function `fn` receives an object with the following content:
```javascript
{
  target: // the DOM element
  insight: // boolean, true if in viewport
  position: // where in relation to the viewport is the element
  rect: // the bounding client rect of the DOM element
}
```

License
-------

[MIT License](LICENSE)
