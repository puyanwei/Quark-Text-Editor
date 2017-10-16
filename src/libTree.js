const treeBtn = document.getElementById("tree-dir");
const li = document.getElementById("tree");

treeBtn.addEventListener("click", treeDir);

function treeDir() {
  const folder = "./";

  fs.readdir(folder, (err, files) => {
    files.forEach(file => {
      console.log(file);
      tree += `<li> ${file} </li>`;
    });
    li.innerHTML = tree;
  });
}
