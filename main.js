const { app, BrowserWindow, Menu, ipcMain, dialog } = require('electron');
const path = require('path');
const url = require('url');
const fs = require('fs');

let mainWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({ width: 800, height: 600 });

  let contents = mainWindow.webContents;

  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file:',
      slashes: true
    })
  );

  mainWindow.on('closed', () => {
    app.quit();
  });

  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);

  Menu.setApplicationMenu(mainMenu);
});

let fileName = 'Undefined';

// function changeFileName (theFileName="Undefined"){
//   let fileName = theFileName
// }

function openFile() {
  const files = dialog.showOpenDialog(mainWindow, {
    properties: ['openFile'],
    filters: [
      {
        name: 'FileNames',
        extensions: ['md', 'txt', 'rb', 'js', 'html', 'css']
      }
    ]
  });

  if (!files) return;

  fileName = files[0];
  const content = fs.readFileSync(fileName).toString();

  mainWindow.webContents.send('open-file', fileName, content);
}

function saveAsFile(content) {
  const fileSave = dialog.showSaveDialog(mainWindow, {
    title: 'Save HTML Output',
    defaultPath: app.getPath('documents')
    // filters: [
    //   // { name: 'HTML Files', extensions: ['rb'] }
    // ]
  });

  if (!fileSave) return;

  fileName = fileSave;

  mainWindow.webContents.send('file-name', fileName);

  fs.writeFileSync(fileName, content);
}

function saveFile(content) {
  fs.writeFileSync(fileName, content);
}

const mainMenuTemplate = [
  {
    label: 'File',
    submenu: [
      {
        label: 'Save',
        accelerator: process.platform == 'darwin' ? 'Command+S' : 'Crtl+S',
        click() {
          mainWindow.webContents.send('save-file');
        }
      },
      {
        label: 'Save As...?',
        accelerator:
          process.platform == 'darwin' ? 'Shift+Command+S' : 'Shift+Crtl+S',
        click() {
          mainWindow.webContents.send('save-as-file');
        }
      },
      {
        label: 'Open...',
        accelerator: process.platform == 'darwin' ? 'Command+O' : 'Crtl+O',
        click() {
          openFile();
        }
      },
      {
        label: 'Rage Quit',
        accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Crtl+Q'
      }
    ]
  },
  {
    label: 'Edit',
    submenu: [
      {
        label: 'Cut it',
        accelerator: process.platform == 'darwin' ? 'Command+X' : 'Crtl+X',
        selector: 'cut:'
      },
      {
        label: 'Lazy copying',
        accelerator: process.platform == 'darwin' ? 'Command+C' : 'Crtl+C',
        selector: 'copy:'
      },
      {
        label: 'Paste',
        accelerator: process.platform == 'darwin' ? 'Command+V' : 'Crtl+V',
        selector: 'paste:'
      },
      {
        label: 'Undo your mistake',
        accelerator: process.platform == 'darwin' ? 'Command+Z' : 'Crtl+Z',
        selector: 'undo:'
      },
      {
        label: 'Redo what your thought was a mistake',
        accelerator: process.platform == 'darwin' ? 'Command+Y' : 'Crtl+Y',
        selector: 'redo:'
      }
    ]
  },
  {
    label: 'Duck Memes',
    submenu: [
      {
        label: 'Yeah right...'
      }
    ]
  },
  {
    label: 'Quack?',
    submenu: [
      {
        label: 'We just love ducks'
      }
    ]
  }
];

if (process.platform == 'darwin') {
  mainMenuTemplate.unshift({});
}

if (process.env.NODE_ENV !== 'production') {
  mainMenuTemplate.push({
    label: 'Developer tools',
    submenu: [
      {
        label: 'Toggle DevTools',
        accelerator: process.platform == 'darwin' ? 'Command+I' : 'Crtl+I', // keyboard short cut
        click(item, focusedWindow) {
          focusedWindow.toggleDevTools();
        }
      },
      {
        role: 'reload' // adding reload option in the dev tools menu
      }
    ]
  });
}

module.exports = {
  saveAsFile,
  saveFile,
  mainMenuTemplate
};
