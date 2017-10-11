
const fs = require('fs')

window.onload = function (){

  var btn = document.getElementById("loadbutton");

  btn.addEventListener("click", loadFile);

  function loadFile() {
    var editor = document.getElementById('editor');

    var readThisFile = fs.readFileSync('file.txt', 'utf8');

    editor.innerText = readThisFile;
  }

}
// module.exports = loadFile


// window.onload = function (){
//
//   var btn = document.getElementById("btn");
//   // var notes = []
//
//   btn.addEventListener("click", function(){
//     var htmlNote = document.getElementById("noteForm").value;
//     noteList.addNote(htmlNote);
//     controller.changeView();
//     // notes.push(newNote)
//   })
//
// }
