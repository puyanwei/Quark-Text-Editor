const {app, BrowserWindow, Menu} = require('electron')
const path = require('path')
const url = require('url')
const fs = require("fs")
const mainMenuTemplate = require('./mainMenuTemplate')

let mainWindow;

app.on('ready', function () {

  mainWindow = new BrowserWindow({width: 800, height: 600})

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  mainWindow.on('closed', () => {
    app.quit();
  })

  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);

  Menu.setApplicationMenu(mainMenu);

});
