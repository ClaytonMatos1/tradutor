const { ipcMain } = require('electron');

const isMac = process.platform === 'darwin';

module.exports = {
    generateMainMenu (app) {
        let templateMenu = [
            {
                label: isMac ? app.name : 'File',
                submenu: [
                    isMac ? { role: 'close' } : { role: 'quit' }
                ]
            },
            {
                label: 'View',
                submenu: [
                    { role: 'reload' },
                    { role: 'forcereload' },
                    { type: 'separator' },
                    { role: 'resetzoom' },
                    { role: 'zoomin' },
                    { role: 'zoomout' },
                    { type: 'separator' },
                    { role: 'togglefullscreen' }
                ]
            },
            {
                label: 'Window',
                submenu: [
                    { role: 'minimize' },
                    { role: 'zoom' }
                ]
            },
            {
                label: 'Help',
                submenu: [
                    {
                        label: 'About',
                        click: () => ipcMain.emit('open-window-about'),
                        accelerator: 'CmdOrCtrl+H'
                    }
                ]
            }
        ];

        return templateMenu;
    }
}