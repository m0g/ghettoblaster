import { app, ipcMain, BrowserWindow, Tray } from 'electron';
import path from 'path';
import url from 'url';
import { Client } from 'disconnect';

import search from './search';
import play from './play';

const db = new Client().database();

//const electron = require('electron')
//// Module to control application life.
//const app = electron.app
//const ipcMain = electron.ipcMain;
//// Module to create native browser window.
//const BrowserWindow = electron.BrowserWindow

//const path = require('path')
//const url = require('url')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow, tray;

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600})
  tray = new Tray(path.join(__dirname, '../static/logo.png'));

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, '../static/index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  //mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })

  ipcMain.on('ready', () => {
    db.getMaster(350618, function(err, data){
        //console.log(data);
        mainWindow.webContents.send('test-release', data);
    });
  });

  ipcMain.on('play-track', (e, data) => {
    console.log('data', data);
    search(`${data.artist} ${data.track}`)
      .then(play);
      //.then((videoUrl) => {
      //  console.log('video url', videoUrl);
      //});
  });

  db.search('Arcade Fire', {}, (err, data) => {
    console.log('db search', err, data);
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
//app.on('window-all-closed', function () {
//  // On OS X it is common for applications and their menu bar
//  // to stay active until the user quits explicitly with Cmd + Q
//  if (process.platform !== 'darwin') {
//    app.quit()
//  }
//})


