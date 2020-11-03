const { app, BrowserWindow, Menu } = require('electron');
const template = require('./app/js/template');

function createWindow () {
    const win = new BrowserWindow({
        width: 450,
        height: 400,
        backgroundColor: '#faebd7',
        icon: `file://${__dirname}/app/img/icon.ico`,
        webPreferences: {
            nodeIntegration: true
        }
    });

    win.loadURL(`file://${__dirname}/app/index.html`);

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