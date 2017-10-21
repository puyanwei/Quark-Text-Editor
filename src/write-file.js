const { dialog } = require("electron").remote;
const fs = require("fs");

window.onload = function() {
  var saveBtn = document.getElementById("savebutton");

  saveBtn.addEventListener("click", saveFile);

  function saveFile() {
    let content = document.getElementById("editor").innerText;

    dialog.showSaveDialog(filename => {
      if (filename === undefined) {
        console.log("You didn't save the file");
        return;
      }

      fs.writeFile(filename, content, err => {
        if (err) {
          alert("An error occured creating the file " + err.message);
        }
        alert("The file has been succesfully saved");
      });
    });
  }
};
