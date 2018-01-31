setInterval(() => {
  characterCount();
  wordCount();
  lineCount();
}, 50);

function characterCount() {
  let text = document.getElementById("editor").innerText;
  let characters = text.split("").length - 1;
  if (characters < 0) {
    characters = 0;
  }
  document.getElementById("character-counter").innerText = characters;
}

function wordCount() {
  let text = document.getElementById("editor").innerText;
  let words = text.split(/\S+/g).length - 1;
  document.getElementById("word-counter").innerText = words;
}

function lineCount() {
  let text = document.getElementById("editor").innerText;
  let lines = text.split(/\n/).length - 1;
  document.getElementById("line-counter").innerText = lines;
}
