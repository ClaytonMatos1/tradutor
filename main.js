const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const template = require('./app/js/template');

function createWindow () {
    const win = new BrowserWindow({
        width: 450,
        height: 400,
        backgroundColor: '#faebd7',
        icon: `${__dirname}/app/public/img/icon.ico`,
        darkTheme: true,
        webPreferences: {
            nodeIntegration: true
        }
    });

    win.loadURL(`file://${__dirname}/app/index.html`);
    win.on('closed', () => {
        if (aboutWindow) {
            aboutWindow.close();
        }
    });

    let templateMenu = template.generateMainMenu(app);
    let mainMenu = Menu.buildFromTemplate(templateMenu);
    Menu.setApplicationMenu(mainMenu);
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