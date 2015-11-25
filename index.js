var urlFromGit = require('github-url-from-git')
var gitconfiglocal = require('gitconfiglocal')
var urlParse = require('url').parse

module.exports = function (path, remote, cb) {
  if (typeof remote === 'function') {
    cb = remote
    remote = 'origin'
  }

  gitconfiglocal(path, function (err, config) {
    if (err) return cb(err)
    if ('remote' in config && remote in config.remote && 'url' in config.remote[remote]) {
      var url = urlFromGit(config.remote[remote].url)
      if (!url) return cb(new Error('Not a GitHub URL'))
      var slug = urlParse(url).path.slice(1)
      cb(null, slug)
    } else {
      cb(new Error('No GitHub URL in remote "' + remote + '"'))
    }
  })
}
