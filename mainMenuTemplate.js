
const mainMenuTemplate = [
  {
    label: 'File',
    submenu: [
      {
        label1: 'Save File',
        click(item, focusedWindow){
          // focusedWndow.close();
        }
      },
      {
        label2: 'Quit',
        click(item, focusedWindow){
        focusedWindow.close();
        }
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
