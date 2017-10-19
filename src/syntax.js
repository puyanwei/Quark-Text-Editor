// updates syntax on keyup, also works with keypress

const namez = remote.require('./main')


document.addEventListener("keyup", updateSyntax);
var editor = document.getElementById("editor");

function updateSyntax() {
  syntaxRecog();
  getCaretCharacterOffsetWithin();
  Prism.highlightElement(editor);
  setCurrentCursorPosition(caretOffset);
}



function syntaxRecog(){

  let currentFileNamez = namez.currentFile();
  // console.log(namez.currentFile())
  var fileLang = currentFileNamez.replace(/.*\./, "")

  var languages = { "css": "css",
                    "js": "javascript",
                    "rb": "ruby",
                    "html": "html",
                    "md": "markdown"
                  }

  editor.className = `language-${languages[fileLang.toString()]}`
}

//  Cursor setting
//

var caretOffset = 0

function getCaretCharacterOffsetWithin() {
    // var caretOffset = 0;
    var doc = editor.ownerDocument || editor.document;
    var win = doc.defaultView || doc.parentWindow;
    var sel;
    if (typeof win.getSelection != "undefined") {
        sel = win.getSelection();
        if (sel.rangeCount > 0) {
            var range = win.getSelection().getRangeAt(0);
            var preCaretRange = range.cloneRange();
            preCaretRange.selectNodeContents(editor);
            preCaretRange.setEnd(range.endContainer, range.endOffset);
            caretOffset = preCaretRange.toString().length;
        }
    } else if ( (sel = doc.selection) && sel.type != "Control") {
        var textRange = sel.createRange();
        var preCaretTextRange = doc.body.createTextRange();
        preCaretTextRange.moveToElementText(editor);
        preCaretTextRange.setEndPoint("EndToEnd", textRange);
        caretOffset = preCaretTextRange.text.length;
    }
    console.log("CARET log:", caretOffset)
    return caretOffset;
}

function createRange(node, chars, range) {
    if (!range) {
        range = document.createRange()
        range.selectNode(node);
        range.setStart(node, 0);
    }

    if (chars.count === 0) {
        range.setEnd(node, chars.count);
    } else if (node && chars.count >0) {
        if (node.nodeType === Node.TEXT_NODE) {
            if (node.textContent.length < chars.count) {
                chars.count -= node.textContent.length;
            } else {
                 range.setEnd(node, chars.count);
                 chars.count = 0;
            }
        } else {
            for (var lp = 0; lp < node.childNodes.length; lp++) {
                range = createRange(node.childNodes[lp], chars, range);

                if (chars.count === 0) {
                   break;
                }
            }
        }
   }

   return range;
};

function setCurrentCursorPosition(chars) {
console.log(caretOffset)
    if (chars >= 0) {
        var selection = window.getSelection();

        range = createRange(document.getElementById("editor").parentNode, { count: chars });

        if (range) {
            range.collapse(false);
            selection.removeAllRanges();
            selection.addRange(range);
        }
    }
};
