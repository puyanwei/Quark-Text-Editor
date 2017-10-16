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
        accelerator: process.platform == 'darwin' ? 'Command+X' : 'Crtl+X'
      },
      {
        label: 'Copy',
        accelerator: process.platform == 'darwin' ? 'Command+C' : 'Crtl+C',
        selector: "copy:"
        // click(){
        //   var content = clipboard.readText();
        //   alert(content);
        // }
      },
      {
        label: 'Paste',
        accelerator: process.platform == 'darwin' ? 'Command+P' : 'Crtl+P'
      }
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
