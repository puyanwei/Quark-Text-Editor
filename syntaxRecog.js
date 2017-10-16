// For later refactor

function syntaxRecog(){
    var fileLang = currentFileName.replace(/.*\./, "")
    // console.log(fileLang)
    
    var languages = { "css": "css",
                      "js": "javascript",
                      "rb": "ruby",
                      "html": "html",
                      "md": "markdown"
                    }
    
    console.log(languages[fileLang.toString()])
    editor.className = `language-${languages[fileLang.toString()]}`
}

module.exports = syntaxRecog
