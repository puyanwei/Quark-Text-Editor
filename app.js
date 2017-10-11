document.write('The current version of io.js' + process.version)

var fs = require('fs')
var content = fs.readFileSync('./package.json', 'utf8')
alert(content)
