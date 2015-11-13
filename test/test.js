'use strict';

var promisify = require('promisify-node');

var assert = require('assert');
var childProcess = require('child_process');
var temp = require('temp').track();

var ghslug = promisify(require('../index.js'));

describe('github-slug', function() {
  var oldWD = process.cwd();

  beforeEach(function() {
    process.chdir(temp.mkdirSync('github-slug'));
  });

  afterEach(function() {
    process.chdir(oldWD);
  });

  it('returns the correct slug', function() {
    childProcess.execSync('git init');
    childProcess.execSync('git remote add origin https://github.com/marco-c/github-slug.git');

    return ghslug('./').then(function(slug) {
      assert.equal(slug, 'marco-c/github-slug');
    });
  });

  it('returns the correct slug when there are multiple remotes', function() {
    childProcess.execSync('git init');
    childProcess.execSync('git remote add origin https://github.com/marco-c/github-slug.git');
    childProcess.execSync('git remote add upstream https://github.com/finnp/github-slug.git');

    return ghslug('./', 'origin').then(function(slug) {
      assert.equal(slug, 'marco-c/github-slug');

      return ghslug('./', 'upstream').then(function(slug) {
        assert.equal(slug, 'finnp/github-slug');
      });
    });
  });

  it('fails if the specified remote doesn\'t exist', function() {
    childProcess.execSync('git init');
    childProcess.execSync('git remote add origin https://github.com/marco-c/github-slug.git');

    return ghslug('./', 'upstream').then(function() {
      assert(false);
    }, function(err) {
      assert(err);
    });
  });

  it('fails if the remote URL isn\'t a GitHub URL', function() {
    childProcess.execSync('git init');
    childProcess.execSync('git remote add origin https://marco.it/marco-c/github-slug.git');

    return ghslug('./', 'origin').then(function() {
      assert(false);
    }, function(err) {
      assert(err);
    });
  });

  it('fails if outside of a git repository', function() {
    return ghslug('./').then(function() {
      assert(false);
    }, function(err) {
      assert(err);
    });
  });
});
