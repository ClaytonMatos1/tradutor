const { app, BrowserWindow, Menu, ipcMain, Tray } = require('electron');

const template = require('./app/js/template');
const LocalStorageUtils = require('./app/utils/localStorageUtils');

let tray = null;
let win = null;
async function createWindow () {
    win = new BrowserWindow({
        width: 450,
        height: 420,
        icon: `${__dirname}/app/public/img/icon.ico`,
        darkTheme: true,
        frame: false,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            preload: `${__dirname}/app/js/preload.js`
        }
    });

    win.loadURL(`file://${__dirname}/app/index.html`);
    win.on('closed', () => {
        if (aboutWindow) {
            aboutWindow.close();
        }
    });
    const choicedColor = await LocalStorageUtils.getStorageAppColor(win);
    win.webContents.send('choiced-color', choicedColor);

    tray = new Tray(`${__dirname}/app/public/img/icon.ico`);
    const contextMenu = await template.trayTemplate(app, win);
    let trayMenu = Menu.buildFromTemplate(contextMenu);
    tray.setToolTip('App Tradutor');
    tray.setContextMenu(trayMenu);
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

let aboutWindow = null;
ipcMain.on('open-window-about', () => {
    if (!aboutWindow) {
        aboutWindow = new BrowserWindow({
            width: 320,
            height: 220,
            icon: `${__dirname}/app/public/img/icon.ico`,
            alwaysOnTop: true,
            maximizable: false,
            minimizable: false,
            resizable: false,
            webPreferences: {
                nodeIntegration: true
            }
        });

        aboutWindow.on('closed', () => {
            aboutWindow = null;
        });
        aboutWindow.removeMenu();
    }

    aboutWindow.loadURL(`file://${__dirname}/app/public/html/about.html`);
});

ipcMain.on('close-window-about', () => {
    aboutWindow.close();
});
