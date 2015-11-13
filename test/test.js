'use strict';

var assert = require('assert');
var childProcess = require('child_process');
var temp = require('temp').track();

var ghslug = require('../index.js');

describe('github-slug', function() {
  var oldWD = process.cwd();

  beforeEach(function() {
    process.chdir(temp.mkdirSync('github-slug'));
  });

  afterEach(function() {
    process.chdir(oldWD);
  });

  it('returns the correct URL', function(done) {
    childProcess.execSync('git init');
    childProcess.execSync('git remote add origin https://github.com/marco-c/github-slug.git');

    ghslug('./', function(err, slug) {
      assert.equal(slug, 'marco-c/github-slug');
      done();
    });
  });
});
