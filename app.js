
var fs = require('fs');
const {dialog} = require('electron').remote;



function save () {

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

};

save();


// to read a file, we will show a dialog that allows
 // the user to select the file easily to show its content in the screen.

 // once the dialog is closed, it should provide the absolute path of the file.
function openfile() {

  document.getElementById("read-file").addEventListener("click", ()=> {

   dialog.showOpenDialog((fileNames)=> {
    //  this callback recieves an array of selected files. by default it only selects one
    if (fileNames === undefined){
      console.log("No files were selected");
      return;
    }
      fs.readFile(fileNames, "utf-8", (err, data) => {
      if(err){
        alert("An arror occured reading the file :" + err.message);
        return;
      }
      console.log("the content of the file is: " + data);
    })
   })
  }, false);

}

openfile();

// function updatefile(){
//   document.getElementById("update-file").addEventListener("click", () => {
// // display the open file diaog to slect a file.
// // using the writeFile method of the fs you can replace the content of an existent file
//     let theNewContent = "This is the new content file 12232"
//   }, false);
// }

module.exports = {
  save,
  openfile }
