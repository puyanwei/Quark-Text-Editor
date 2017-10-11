const fs = require('fs')

window.onload = function (){


var editor = document.getElementById('editor');

var readThisFile = fs.readFileSync('file.txt', 'utf8');

editor.innerText = readThisFile;

};
