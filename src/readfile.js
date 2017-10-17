const { dialog } = require("electron").remote;
const fs = require("fs");

let currentFileName;
let saveAsBtn = document.getElementById("save-as-button");
let saveBtn = document.getElementById("save-button");
let loadBtn = document.getElementById("load-button");
// let intervalID = window.setInterval(myCallback, 500);

saveAsBtn.addEventListener("click", saveAsFile);
loadBtn.addEventListener("click", loadFile);
saveBtn.addEventListener("click", saveFile);

function loadFile() {
  let editor = document.getElementById("editor");

  dialog.showOpenDialog(fileNames => {
    if (fileNames[0] === undefined) {
      console.log("No files were selected");
      return;
    }

    currentFileName = fileNames[0];
    console.log(currentFileName);

    fs.readFile(fileNames[0], "utf8", (err, data) => {
      if (err) {
        return alert("An arror occured reading the file :");
      }
      console.log("the content of the file is: " + data);
      editor.innerText = data;
      updateSyntax();
    });
  });
}

//  save
function saveAsFile() {
  let content = document.getElementById("editor").innerText;

  dialog.showSaveDialog(fileName => {
    if (fileName === undefined) {
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
// module.exports = loadFile

// window.onload = function (){
//
//   let btn = document.getElementById("btn");
//   // let notes = []
//
//   btn.addEventListener("click", function(){
//     let htmlNote = document.getElementById("noteForm").value;
//     noteList.addNote(htmlNote);
//     controller.changeView();
//     // notes.push(newNote)
//   })
//
// }
