// let wordCountBtn = document.getElementById("word-count");
document.addEventListener("keydown", characterCount);
document.addEventListener("keydown", wordCount);
document.addEventListener("keydown", lineCount);

function characterCount() {
  let text = document.getElementById("editor").innerText;
  let words = text.split(/\s+/g).length;

  document.getElementById("character-counter").innerText = words;
}

function wordCount() {
  let text = document.getElementById("editor").innerText;
  let words = text.split(/\s+/g).length;

  document.getElementById("word-counter").innerText = words;
}

function lineCount() {
  let text = document.getElementById("editor").innerText;
  let words = text.split(/\s+/g).length;

  document.getElementById("line-counter").innerText = words;
}
