const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require('path');
const isDev = require('electron-is-dev');
const autoUpdater = require("electron-updater").autoUpdater

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({width: 900, height: 680});
  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`); // load the react app
  mainWindow.on('closed', () => mainWindow = null);
}

app.on('ready', createWindow);

// on MacOS leave process running also with no windows
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// if there are no windows create one
app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
