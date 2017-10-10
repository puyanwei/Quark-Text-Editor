const mainMenuTemplate = [

  {
    label: 'File',
    submenu: [
      {
        label: 'Save File'
      },
      {
        label: 'New File'
      },
      {
        label: 'Quit'
        }
    ]
  }
]

module.exports = {
  mainMenuTemplate
};

// if(process.platform == 'darwin'){
//   mainMenuTemplate.unshift({});
// }
