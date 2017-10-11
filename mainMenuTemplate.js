const mainMenuTemplate = [
  {
    label: 'File',
    submenu: [
      {
        label: 'Save File'
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
