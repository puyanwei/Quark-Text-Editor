const {dialog} = require('electron').remote;
const fs = require('fs')


window.onload = function (){

  // Buttons

  var saveBtn = document.getElementById("savebutton");

  saveBtn.addEventListener("click", saveFile);

  var loadBtn = document.getElementById("loadbutton");

  loadBtn.addEventListener("click", loadFile);

 //  Load

  function loadFile() {
    var editor = document.getElementById('editor');

    var readThisFile = fs.readFileSync('file.txt', 'utf8');

    editor.innerText = readThisFile;
  }


  //  save
  function saveFile(){
    let content = document.getElementById('editor').innerText

    dialog.showSaveDialog((filename) => {
      if (filename === undefined){
        console.log("You didn't save the file");
        return;
      }

      fs.writeFile(filename, content, (err) => {
        if (err){
          alert("An error occured creating the file " + err.message)
        }
        alert("The file has been succesfully saved");
      });
    });
  };

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
