# github-slug

Gets the github-slug for the given directory.

Install with `npm install github-slug`

```javascript
var ghslug = require('github-slug')
ghslug('./', 'origin', function (err, slug) {
  console.log(slug)
  // evaluates to 'finnp/github-slug' in this directory
})
```

The second argument, the remote, is optional ('origin' by default).
