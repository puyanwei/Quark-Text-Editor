//
// const electron = require('electron');
// const {dialog} = require('electron').remote;
// const fs = require('fs')
// const ipc = electron.ipcRenderer
//
// const mainMenuTemplate = [
//   {
//     label: "File",
//     submenu: [
//       {
//         label: "Save",
//         accelerator: process.platform == "darwin" ? "Command+S" : "Crtl+S"
//       },
//       {
//         label: "Save As",
//         accelerator:
//           process.platform == "darwin" ? "Shif+Command+S" : "Shift+Crtl+S"
//       },
//       {
//         label: "Open...",
//         accelerator: process.platform == "darwin" ? "Command+O" : "Crtl+O",
//         click() { openFile() }
//       },
//       {
//         label: "Quit",
//         accelerator: process.platform == "darwin" ? "Command+Q" : "Crtl+Q"
//       }
//     ]
//   },
//   {
//     label: "Edit",
//     submenu: [
//       {
//         label: "Cut",
//         accelerator: process.platform == "darwin" ? "Command+X" : "Crtl+X",
//         selector: "cut:"
//       },
//       {
//         label: "Copy",
//         accelerator: process.platform == "darwin" ? "Command+C" : "Crtl+C",
//         selector: "copy:"
//       },
//       {
//         label: "Paste",
//         accelerator: process.platform == "darwin" ? "Command+V" : "Crtl+V",
//         selector: "paste:"
//       },
//       {
//         label: "Undo",
//         accelerator: process.platform == "darwin" ? "Command+Z" : "Crtl+Z",
//         selector: "undo:"
//       },
//       {
//         label: "Redo",
//         accelerator: process.platform == "darwin" ? "Command+Y" : "Crtl+Y",
//         selector: "redo:"
//       }
//     ]
//   }
// ];
//
// if (process.platform == "darwin") {
//   mainMenuTemplate.unshift({});
// }
//
// if (process.env.NODE_ENV !== "production") {
//   mainMenuTemplate.push({
//     label: "Developer tools",
//     submenu: [
//       {
//         label: "Toggle DevTools",
//         accelerator: process.platform == "darwin" ? "Command+I" : "Crtl+I", // keyboard short cut
//         click(item, focusedWindow) {
//           focusedWindow.toggleDevTools();
//         }
//       },
//       {
//         role: "reload" // adding reload option in the dev tools menu
//       }
//     ]
//   });
// }
//
// function openFile () {
//   const files = dialog.showOpenDialog(mainWindow, {
//     properties: ['openFile'],
//     filters: [
//       {name: 'FileNames', extensions: ['md', 'txt', 'rb', 'js', 'html', 'css']}
//     ]
//   });
//
//   if (!files) return
//
//   const file = files[0]
//   const content = fs.readFileSync(file).toString()
//
//   mainWindow.webContents.send('file-opened', file, content)
// }
//
//
// module.exports = mainMenuTemplate;
