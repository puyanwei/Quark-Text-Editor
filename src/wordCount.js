document.addEventListener("keydown", characterCount);
document.addEventListener("keydown", wordCount);
document.addEventListener("keypress", lineCount);

function characterCount() {
  let text = document.getElementById("editor").innerText;
  let characters = text.split("").length;

  document.getElementById("character-counter").innerText = characters;
}

function wordCount() {
  let text = document.getElementById("editor").innerText;
  let words = text.split(/\S+/g).length;

  document.getElementById("word-counter").innerText = words;
}

function lineCount() {
  let text = document.getElementById("editor").innerText;
  let lines = text.split(/\n/).length;
  console.log(lines);

  document.getElementById("line-counter").innerText = lines;
}
