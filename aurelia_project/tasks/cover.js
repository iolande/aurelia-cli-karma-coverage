import gulp from 'gulp';
import {Server as Karma} from 'karma';
import {CLIOptions} from 'aurelia-cli';
import build from './build';
import path from 'path';
import project from '../aurelia.json';

let testSrc = [
  { pattern: project.transpiler.source, included: false },
  { pattern: project.unitTestRunner.source, included: false },
  'test/aurelia-karma-cover.js'
];

let karma = done => {
  new Karma({
    configFile: path.join(__dirname, '/../../karma.conf.js'),
    frameworks: [project.testFramework.id, 'requirejs'],
    files: testSrc,
    exclude: [
      'src/environment.js',
      'src/main.js',
      'src/resources/index.js'
    ],
    preprocessors: {
      'src/**/*.js': ['babel'],
      'test/unit/**/*.js': ['babel']
    },
    reporters: ['progress', 'coverage'],
    singleRun: !CLIOptions.hasFlag('watch'),
    coverageReporter: {
      includeAllSources: true,
      reporters: [
        {type: 'html', dir: 'coverage'},
        {type: 'text'}
      ]
    }
  }, done).start();
};

export default gulp.series(
  build,
  karma
);
