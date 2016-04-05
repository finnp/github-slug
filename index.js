var urlFromGit = require('github-url-from-git')
var gitconfiglocal = require('gitconfiglocal')
var urlParse = require('url').parse
var resolvePath = require('path').resolve
var exec = require('child_process').execFile

module.exports = function (path, remote, cb) {
  path = resolvePath(path)
  if (typeof remote === 'function') {
    cb = remote
    remote = 'origin'
  }

  var gitArgs = ['remote', 'show', '-n', remote]
  var matchFetch = /Fetch URL: (.+)/

  exec('git', gitArgs, {cwd: path}, function (err, stdout) {
    if (!err && stdout) {
      var match = matchFetch.exec(stdout.toString())
      if (match) return parseUrl(match[1].trim())
    }
    // fall back to parsing .git/config
    gitconfiglocal(path, function (err, config) {
      if (err) return cb(err)
      var hasRemoteUrl = 'remote' in config && remote in config.remote && 'url' in config.remote[remote]
      if (hasRemoteUrl) return parseUrl(config.remote[remote].url)
      cb(new Error('No GitHub URL in remote "' + remote + '"'))
    })
  })

  function parseUrl (gitUrl) {
    var remoteUrl = urlFromGit(gitUrl)
    if (!remoteUrl) return cb(new Error('Not a GitHub URL'))
    var slug = urlParse(remoteUrl).path.slice(1)
    cb(null, slug)
  }
}
