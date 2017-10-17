const electron = require('electron');
const ipc = electron.ipcRenderer

const selectedEditor = document.querySelector('#editor')

ipc.on('file-opened', (event, file, content)=>{
  selectedEditor.innerHTML = content
})
