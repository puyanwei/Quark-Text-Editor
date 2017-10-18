// let wordCountBtn = document.getElementById("word-count");
document.addEventListener("keydown", wordCount);

function wordCount() {
  let text = document.getElementById("editor").innerText;
  let words = text.split(/\s+/g).length;

  document.getElementById("counter").innerText = words;
}
