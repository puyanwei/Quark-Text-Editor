let wordCountBtn = document.getElementById("word-count");
wordCountBtn.addEventListener("click", wordCount);

function wordCount() {
  let text = document.getElementById("editor").innerText;
  console.log(text.split(" ").length);
}
