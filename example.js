var ghslug = require('./')

ghslug('./', function (err, slug) {
  if (err) return console.error(err)
  console.log(slug)
})
