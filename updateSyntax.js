
const path = require("path");
// keypress event hashed out until cursor issues can be resolved.
// document.addEventListener("keypress", updateSyntax);
var syntaxBtn = document.getElementById("syntax-button");
var editor = document.getElementById("editor");

syntaxBtn.addEventListener("click", updateSyntax);


function updateSyntax() {
  // targets only the editor element
  Prism.highlightElement(editor);
  // document.getElementById("editor");

  // targets the whole page
  // Prism.highlightAll();
}

// function updateSyntax(){
//       Prism.highlightElement(editor);
      // editor.focus()
      // console.log("before update")
      // console.log(window.getSelection())
      //  targets only the editor element
      // var selection = window.getSelection(editor);
      // console.log(selection)
      // var range = selection.getRangeAt(0)
      // window.getSelection().collapse(editor,false)
      // console.log(window.getSelection().collapse(editor,0))
      // console.log(range)
      // editor.focus()
      // range.collapse(false)
      // range.collapse(false)

      // console.log("after update");
      // console.log(window.getSelection());

      // console.log("after update")
      // console.log(window.getSelection())
      //  focuses the element (brings cursor to start) find a way to set this to it's last known value
      // editor.focus()
      // look into window.getSelection() which gives you your current location
      // targets the whole page
      // Prism.highlightAll();
    // };















//
//
// const Prism = require('./prism.js')
// const path = require('path')
//
// (function(exports) {
//
//    function SyntaxUpdate(){
//
//      // keypress event hashed out until cursor issues can be resolved.
//      document.addEventListener("keypress", updateSyntax);
//      var syntaxBtn = document.getElementById("syntax-button");
//      var editor = document.getElementById('editor');
//
//      syntaxBtn.addEventListener("click", updateSyntax);
//
//      };
//
//    SyntaxUpdate.prototype.updateSyntax = function (){
//       Prism.highlightElement(editor);
//    };
//
//   exports.SyntaxUpdate = SyntaxUpdate;
// })(this);
