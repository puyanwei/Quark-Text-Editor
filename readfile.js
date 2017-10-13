const { dialog } = require("electron").remote;
const fs = require("fs");

window.onload = function() {
  let currentFileName = "nothing";
  console.log(currentFileName);

  // Buttons

  var saveAsBtn = document.getElementById("save-as-button");

  saveAsBtn.addEventListener("click", saveAsFile);

  var loadBtn = document.getElementById("load-button");

  loadBtn.addEventListener("click", loadFile);

  var saveBtn = document.getElementById("save-button");

  saveBtn.addEventListener("click", saveFile);

  // function initPage() {
  //   var elEd = document.getElementById("editor");
  //   elEd.contentEditable = true;
  //   elEd.focus();
  // }
  // initPage();

  var wordCountBtn = document.getElementById("word-count");

  wordCountBtn.addEventListener("click", wordCount);

  function wordCount() {
    var text = document.getElementById("editor").innerText;
    console.log(text.split(" ").length);
  }

  //  Load

  function loadFile() {
    var editor = document.getElementById("editor");

    dialog.showOpenDialog(fileNames => {
      // if (fileNames[0] === undefined){
      //   console.log("No files were selected");
      //   return;
      // }

      currentFileName = fileNames[0];
      console.log(currentFileName);

      fs.readFile(fileNames[0], "utf8", (err, data) => {
        if (err) {
          return alert("An arror occured reading the file :");
        }
        console.log("the content of the file is: " + data);
        editor.innerText = data;
      });
    });
  }

  //  save
  function saveAsFile() {
    let content = document.getElementById("editor").innerText;

    dialog.showSaveDialog(fileName => {
      if (filename === undefined) {
        console.log("You didn't save the file");
        return;
      }

      currentFileName = fileName;

      fs.writeFile(fileName, content, err => {
        if (err) {
          alert("An error occured creating the file " + err.message);
        }
        alert("The file has been succesfully saved");
      });
    });
  }

  function saveFile() {
    let content = document.getElementById("editor").innerText;

    fs.writeFile(currentFileName, content, err => {
      if (err) {
        alert("An error occured creating the file " + err.message);
      }
      alert("The file has been succesfully saved");
      console.log(currentFileName);
    });
  }
};
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
