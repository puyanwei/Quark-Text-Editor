
var fs = require('fs');
const {dialog} = require('electron').remote;




document.getElementById("create-new-file").addEventListener("click", ()=> {

  let content = document.getElementById("editor").textContent;

// display and save file dialog from the module
// (the callback receives the path where the file should be created)
  dialog.showSaveDialog((filename)=> {

    // if the callback doesn't recieve any argument, it means that the user
    // probably cancelled the creation of the file.
    if(filename === undefined){
      console.log("The user clicked the button, but didn't create a file");
      return;
    }

// use the filesystem module to create the file in the providen path that the dialog returned
// (the content of the file is expected as the second argument, that is a very simple string)
  fs.writeFile(filename, content, (err) => {
    if(err){
      console.log("An error occured with the creation of the file" + err.message)
      return;
    }
  })
  alert("File created!")

  });
}, false);
