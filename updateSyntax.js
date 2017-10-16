function SyntaxUpdate(){


const path = require("path");
// keypress event hashed out until cursor issues can be resolved.
document.addEventListener("keypress", updateSyntax);
var syntaxBtn = document.getElementById("syntax-button");
var editor = document.getElementById("editor");


syntaxBtn.addEventListener("click", updateSyntax);

var timeout

function updateSyntax() {
   timeout = setTimeout(prismFunc, 3000)
};

function prismFunc(){
  var curserPosition = editor.getBoundingClientRect()
  console.log(curserPosition)
  Prism.highlightElement(editor);
}

};

SyntaxUpdate();

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
