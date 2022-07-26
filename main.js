// Modules to control application life and create native browser window
const { app, BrowserView, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
var window = 0;

const os = require("os");
const storage = require("electron-json-storage");




ipcMain.handle("quit-app", () => {
  app.quit();
});
ipcMain.handle("max-app", () => {
  BrowserWindow.getFocusedWindow().maximize();
  ipcMain.handle("flip-max-restore", async (event, someArgument) => {
    const result = await doSomeWork(someArgument);
    return result;
  });
});
ipcMain.handle("restore-app", () => {
  BrowserWindow.getFocusedWindow().unmaximize();
  ipcMain.handle("flip-max-restore", async (event, someArgument) => {
    const result = await doSomeWork(someArgument);
    return result;
  });
});
ipcMain.handle("min-app", () => {
  BrowserWindow.getFocusedWindow().minimize();
});

function createMainWindow() {
  // Create the browser window.
  const view = new BrowserView()
  const mainWindow = new BrowserWindow({
    width: 600,
    height: 500,
    frame: false,
    backgroundColor: "#FFF",
    enableRemoteModule: true,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });
  mainWindow.loadFile("index.html")
  // and load the index.html of the app.

  require("@electron/remote/main").initialize();
  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  if (BrowserWindow.getAllWindows().length === 0) createMainWindow();
});
app.on("activate", function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createMainWindow();
});
// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
