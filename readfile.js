const {dialog} = require('electron').remote;
const fs = require('fs')


window.onload = function (){

  // Buttons

  var saveAsBtn = document.getElementById("save-as-button");

  saveAsBtn.addEventListener("click", saveAsFile);

  var loadBtn = document.getElementById("load-button");

  loadBtn.addEventListener("click", loadFile);

 //  Load

  function loadFile() {

    var editor = document.getElementById('editor');

    dialog.showOpenDialog((fileNames) => {
      console.log(fileNames)

      // if (fileNames[0] === undefined){
      //   console.log("No files were selected");
      //   return;
      // }

       fs.readFile(fileNames[0], 'utf8', (err, data) => {
         if(err){
           return alert("An arror occured reading the file :");
         }
         console.log("the content of the file is: " + data);
         editor.innerText =  data
         updateSyntax()
       })


    })
  }


  //  save
  function saveAsFile(){
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
