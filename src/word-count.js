setInterval(() => {
  characterCount();
  wordCount();
  lineCount();
}, 100);

function characterCount() {
  let text = document.getElementById("editor").innerText;
  let characters = text.split("").length;
  console.log(characters);
  document.getElementById("character-counter").innerText = characters;
}

function wordCount() {
  let text = document.getElementById("editor").innerText;
  let words = text.split(/\S+/g).length;
  console.log(words);
  document.getElementById("word-counter").innerText = words;
}

function lineCount() {
  let text = document.getElementById("editor").innerText;
  let lines = text.split(/\n/).length;
  console.log(lines);

  document.getElementById("line-counter").innerText = lines;
}
