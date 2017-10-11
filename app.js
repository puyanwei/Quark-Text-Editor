// document.write('The current version of io.js' + process.version)

var fs = require('fs')




var content = fs.readFileSync('./file', 'utf8')
document.write(content)
