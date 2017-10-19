const treeBtn = document.getElementById("tree-dir");
const li = document.getElementById("tree");

treeBtn.addEventListener("click", treeDir);

function treeDir() {
  const folder = "./";
  var tree = ''

  fs.readdir(folder, (err, files) => {
    files.forEach(file => {
      // console.log(file);
      tree += `<li> ${file} </li>`
      console.log(tree)
    });
      li.innerHTML = tree;
  });

}
