var originUrl = require('git-remote-origin-url')
var urlFromGit = require('github-url-from-git')
var urlParse = require('url').parse

module.exports = function (path, cb) {
  originUrl(path, function (err, url) {
    if (err) return cb(err)
    url = urlFromGit(url)
    if (typeof url !== 'string') return cb(new Error('No GitHub URL in remote "origin"'))
    var slug = urlParse(url).path.slice(1)
    cb(null, slug)
  })
}
