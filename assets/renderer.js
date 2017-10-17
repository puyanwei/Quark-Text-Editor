const electron = require('electron');
const ipc = electron.ipcRenderer
const remote = electron.remote
const mainProcess = remote.require('./main')
const selectedEditor = document.querySelector('#editor')


ipc.on('open-file', (event, file, content) => {
  selectedEditor.innerHTML = content
});

ipc.on('save-as-file', (event) => {
  const content = selectedEditor.innerHTML
  mainProcess.saveAsFile(content)
});

ipc.on('save-file', (event) => {
  const saveContent = selectedEditor.innerHTML
  mainProcess.saveFile(saveContent)
})
