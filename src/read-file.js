const { dialog } = require("electron").remote;
const fs = require("fs");

let currentFileName = "Untitled";

function loadFile() {
  let editor = document.getElementById("editor");

  dialog.showOpenDialog(fileNames => {
    if (fileNames[0] === undefined) {
      alert("No files were selected");
      return;
    }

    currentFileName = fileNames[0];

    fs.readFile(fileNames[0], "utf8", (err, data) => {
      if (err) {
        return alert("An arror occured reading the file :");
      }
      alert("the content of the file is: " + data);
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
      alert("You didn't save the file");
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
  });
}
