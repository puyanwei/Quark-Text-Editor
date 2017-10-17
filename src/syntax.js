const path = require("path");
// keypress event hashed out until cursor issues can be resolved.
// document.addEventListener("keypress", updateSyntax);
var syntaxBtn = document.getElementById("syntax-button");
var editor = document.getElementById("editor");

syntaxBtn.addEventListener("click", updateSyntax);

function updateSyntax() {
  // targets only the editor element
  // Prism.highlightElement(editor);

  syntaxRecog()
  // targets the whole page
  Prism.highlightAll();
}

function syntaxRecog(){
  var fileLang = currentFileName.replace(/.*\./, "")
  
  var languages = { "css": "css",
                    "js": "javascript",
                    "rb": "ruby",
                    "html": "html",
                    "md": "markdown"
                  }
  
  // console.log(languages[fileLang.toString()])
  editor.className = `language-${languages[fileLang.toString()]}`
}
