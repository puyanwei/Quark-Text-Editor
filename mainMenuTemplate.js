const { app } = require('electron')

const mainMenuTemplate = [
  {
    label: 'File',
    submenu: [
      {
        label: 'Save File',
        accelerator: process.platform == 'darwin' ? 'Command+S' : 'Crtl+S'
      },
      {
        label: 'Quit',
        accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Crtl+Q'
      }
    ]
  },
  {
    label: 'Edit',
    submenu: [
      {
        label: 'Cut',
        accelerator: process.platform == 'darwin' ? 'Command+X' : 'Crtl+X',
        selector: "cut:"
      },
      {
        label: 'Copy',
        accelerator: process.platform == 'darwin' ? 'Command+C' : 'Crtl+C',
        selector: "copy:"
      },
      {
        label: 'Paste',
        accelerator: process.platform == 'darwin' ? 'Command+V' : 'Crtl+V',
        selector: "paste:"
      },
      {
        label: 'Undo',
        accelerator: process.platform == 'darwin' ? 'Command+Z' : 'Crtl+Z',
        selector: "undo:"
      },
      {
        label: 'Redo',
        accelerator: process.platform == 'darwin' ? 'Command+Y' : 'Crtl+Y',
        selector: "redo:"
      },
    ]
  }
]

if(process.platform == 'darwin'){
  mainMenuTemplate.unshift({});
}

if(process.env.NODE_ENV !== 'production'){
  mainMenuTemplate.push({
    label: 'Developer tools',
    submenu: [
      {
        label: 'Toggle DevTools',
        accelerator: process.platform == 'darwin' ? 'Command+I' : 'Crtl+I', // keyboard short cut
        click(item, focusedWindow){
          focusedWindow.toggleDevTools();
        }
      },
      {
        role: 'reload' // adding reload option in the dev tools menu
      }
    ]
  })
}

module.exports = mainMenuTemplate
