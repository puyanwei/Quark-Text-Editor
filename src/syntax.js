const path = require("path");
// keypress event hashed out until cursor issues can be resolved.
// document.addEventListener("keypress", updateSyntax);
var syntaxBtn = document.getElementById("syntax-button");
var editor = document.getElementById("editor");

syntaxBtn.addEventListener("click", updateSyntax);

function updateSyntax() {
  // targets only the editor element
  Prism.highlightElement(editor);

  // targets the whole page
  Prism.highlightAll();
}
