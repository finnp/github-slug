var originUrl = require('git-remote-origin-url');
var urlFromGit = require('github-url-from-git');
var urlParse = require('url').parse;

var url = urlFromGit(url);
module.exports = function (path, cb) {
    originUrl(path, function (err, url) {
    if(err) return console.error(err);
      if(err) return cb(err);
      var url = urlFromGit(url);
      var slug = urlParse(url).path.slice(1);
      cb(null, slug);
  });
}