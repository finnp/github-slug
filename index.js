var remoteUrl = require('git-remote-url')
var urlFromGit = require('github-url-from-git')
var urlParse = require('url').parse

module.exports = function (path, remote, cb) {
  if (typeof remote === 'function') {
    cb = remote;
    remote = 'origin';
  }

  remoteUrl(path, remote).then(function(url) {
    url = urlFromGit(url)
    if (typeof url !== 'string') return cb(new Error('No GitHub URL in remote "' + remote + '"'))
    var slug = urlParse(url).path.slice(1)
    cb(null, slug)
  }, cb);
}
