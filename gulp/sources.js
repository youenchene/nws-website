var sources = {};

/* ------------------------- *\
    Paths
\* ------------------------- */
sources.roots = {
  src: './src',
  dist: './dist'
};

/* ------------------------- *\
    Clean
\* ------------------------- */
sources.clean = [
  sources.roots.dist + '/assets/',
  sources.roots.dist + '/css/',
  sources.roots.dist + '/js/'
];

/* ------------------------- *\
    Less
\* ------------------------- */
sources.less = {
  src: {
      main: sources.roots.src + '/less/app.less',
      watch: [
        sources.roots.src + '/less/**/*.css',
        sources.roots.src + '/less/**/*.less'
      ]
  },
  dest: sources.roots.dist + '/css'
};

/* ------------------------- *\
    JS
\* ------------------------- */
sources.js = {
    src: [
        sources.roots.src + '/js/libs/*.js',
        sources.roots.src + '/js/**/*.js'
    ],
    dest: sources.roots.dist + '/js'
};

/* ------------------------- *\
    HTML
\* ------------------------- */
sources.html = {
    src: [
        './**/*.html'
    ],
    dest: './'
};

/* ------------------------- *\
    Assets
\* ------------------------- */
sources.assets = {
    src: [
        sources.roots.src + '/assets/**/*.*'
    ],
    dest: sources.roots.dist + '/assets'
};

/* ------------------------- *\
    Root files
\* ------------------------- */
sources.rootFiles = {
    src: [
        sources.roots.src + '/*.*'
    ],
    dest: sources.roots.dist + '/'
};

// -------------------------

module.exports = sources;