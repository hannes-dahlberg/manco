const express = require('express')
const manifest = require('express-manifest');
var path = require('path');

const app = express()

app.use(manifest({
  manifest: __dirname + '/public/mix-manifest.json',
  prepend: __dirname + '/public',
  reqPathFind: /^(\/?)/,
  reqPathReplace: ''
}));

app.use(express.static(__dirname + '/public'));

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})