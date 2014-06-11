# github-slug

Gets the github-slug for the given directory.

Install with `npm install github-slug`

```javascript
var ghslug = require('github-slug');
ghslug('./', function (err, slug) {
  console.log(slug);
  // evaluates to 'finnp/node-github-slug' in this directory
});
```