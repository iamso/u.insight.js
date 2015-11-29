module.exports = {
  options: {
    separator: '\n\n',
    stripBanners: {
      block: false,
      line: false
    },
    banner: '<%= banner %>',
  },
  dist: {
    src: ['src/u.insight.js'],
    dest: 'dist/u.insight.js'
  }
};
