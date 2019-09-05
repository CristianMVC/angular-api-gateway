import gulp from 'gulp'
import gulpLoadPlugins from 'gulp-load-plugins'
import path from 'path'
import del from 'del'
import runSequence from 'run-sequence'

const plugins = gulpLoadPlugins()

const paths = {
  js: [
    './**/*.js',
    '!dist/**',
    '!node_modules/**',
    '!assets/**',
    '!docs/**',
  ],
  nonJs: [
    './package.json',
    './.gitignore',
    './**/*.ejs',
  ],
  tests: './server/tests/*.js',
  mailTemplates: './server/crons/mails/templates/*',
}


// Clean up dist
gulp.task('clean', () =>
  del([
    'dist/**',
    'dist/.*',
    '!dist',
  ])
)

// Set env variables
gulp.task('set-env', () => {
  plugins.env({
    vars: {
      NODE_ENV: 'test',
    },
  })
})

// Lint Javascript
gulp.task('lint', () =>
  gulp.src(paths.js)
    // eslint() attaches the lint output to the "eslint" property
    // of the file object so it can be used by other modules.
    .pipe(plugins.eslint())
    // eslint.format() outputs the lint results to the console.
    // Alternatively use eslint.formatEach() (see Docs).
    .pipe(plugins.eslint.format())
    // To have the process exit with an error code (1) on
    // lint error, return the stream and pipe to failAfterError last.
    .pipe(plugins.eslint.failAfterError())
)

gulp.task('docs', (cb) => {
  plugins.apidoc({
    src: './server/routes/',
    dest: './docs',
    config: './',
  }, cb)
})

// Copy non-js files to dist
gulp.task('copy', () => {
  gulp.src(paths.nonJs)
    .pipe(plugins.newer('dist'))
    .pipe(gulp.dest('dist'))
})

gulp.task('copy-templates', () => {
  gulp.src(paths.mailTemplates)
    .pipe(gulp.dest('dist/server/crons/mails/templates'))
})

/* // Copy non-js files to dist
gulp.task('copy', () =>
  gulp.src(paths.nonJs)
    .pipe(plugins.newer('dist'))
    .pipe(gulp.dest('dist'))
) */

// Compile ES6 to ES5 and copy to dist
gulp.task('babel', () =>
  gulp.src([...paths.js, '!gulpfile.babel.js'], { base: '.' }) //eslint-disable-line comma-dangle
    .pipe(plugins.newer('dist'))
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.babel())
    .pipe(plugins.sourcemaps.write('.', {
      includeContent: false,
      sourceRoot(file) {
        return path.relative(file.path, __dirname)
      },
    }))
    .pipe(gulp.dest('dist'))
)

// Start server with restart on file changes
gulp.task('nodemon', [
  'lint',
  'copy',
  'copy-templates',
  'babel',
  'docs',
], () => {
  plugins.nodemon({
    script: path.join('dist', 'index.js'),
    ext: 'js ejs',
    watch: [
      'server',
      'config',
    ],
    ignore: [
      'node_modules/**/*.js',
      'assets/**/*',
      'dist/**/*.js',
      'dist/**/*.ejs',
    ],
    tasks: [
      'lint',
      'copy',
      'babel',
      'docs',
    ],
  })
})


// triggers mocha test
gulp.task('test', ['set-env'], () => { //eslint-disable-line comma-dangle
  // let reporters
  let  exitCode = 0

  return gulp.src([paths.tests], { read: false }) //eslint-disable-line comma-dangle
    .pipe(plugins.plumber())
    .pipe(plugins.mocha({
      reporter: plugins.util.env['mocha-reporter'] || 'spec',
      ui: 'bdd',
      timeout: 100,
      compilers: 'js:babel-core/register',
    }))
    .once('error', (err) => {
      plugins.util.log(err)
      exitCode = 1
    })
    .once('end', () => {
      plugins.util.log('completed !!')
      process.exit(exitCode)
    })
})

// clean dist, compile js files, copy non-js files and execute tests
gulp.task('mocha', [
  'clean',
], () => {
  runSequence(
    [
      'copy',
      'copy-templates',
      'babel',
    ],
    'test'
  )
})

// gulp serve for development
gulp.task('serve', ['clean'], () => runSequence('nodemon')) //eslint-disable-line comma-dangle

// default task: clean dist, compile js files and copy non-js files.
gulp.task('default', [
  'clean',
], () => {
  runSequence(
    [
      'copy',
      'copy-templates',
      'babel',
      'docs',
    ]
  )
})
