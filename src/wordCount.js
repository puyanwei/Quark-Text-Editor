// let wordCountBtn = document.getElementById("word-count");
document.addEventListener("keyup", wordCount);

function wordCount() {
  let text = document.getElementById("editor").innerText;
  console.log(text.split(" " && "\n").length);
}
