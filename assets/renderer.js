const electron = require('electron');
const ipc = electron.ipcRenderer
const remote = electron.remote
const mainProcess = remote.require('./main')
const selectedEditor = document.querySelector('#editor')

let currentFileName = "untitled"

ipc.on('open-file', (event, fileName, content) => {
  selectedEditor.innerHTML = content
  currentFileName = fileName
  updateSyntax()
  showFileName()
});

ipc.on('save-as-file', (event) => {
  const content = selectedEditor.innerText
  mainProcess.saveAsFile(content)
  updateSyntax()
});

ipc.on('file-name', (event, fileName) => {
  currentFileName = fileName
  console.log(currentFileName)
})

ipc.on('save-file', (event) => {
  const saveContent = selectedEditor.innerText
  mainProcess.saveFile(saveContent)
  alert("Wooooo your file was saved")
})
