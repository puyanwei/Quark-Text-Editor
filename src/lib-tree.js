const treeBtn = document.getElementById("tree-dir");
const list = document.getElementById("tree");
const fs = require("fs");

treeBtn.addEventListener("click", treeDir);

function treeDir() {
  const folder = "./";
  let tree = "";

  fs.readdir(folder, (err, files) => {
    files.forEach(file => {
      tree += `<li> ${file} </li>`;
    });
    list.innerHTML = tree;
  });
}
