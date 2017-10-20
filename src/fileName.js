document.getElementById("head").innerText = currentFileName;

function showFileName(){
  justFileName = currentFileName.replace(/^(.*[\\\/])/, "")
  document.getElementById("head").innerText = justFileName;
};