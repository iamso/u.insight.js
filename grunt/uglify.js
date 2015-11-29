module.exports = {
  options: {
    mangle: {
      except: ['u', 'µ']
    },
    compress: {
      //drop_console: true
    },
    preserveComments: false,
    sourceMap: true
  },
  dist: {
    options: {
      banner: '<%= banner %>'
    },
    src: ['dist/u.insight.js'],
    dest: 'dist/u.insight.min.js'
  }
};
