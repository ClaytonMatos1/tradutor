const { ipcMain } = require('electron');

const colors = require('../domain/colors');
const LocalStorageUtils = require('../utils/localStorageUtils');

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
    },

    async trayTemplate (win) {
        let template = [
            {
                label: 'Cores'
            },
            {
                type: 'separator'
            }
        ];

        const choicedColor = await LocalStorageUtils.getStorageAppColor(win);
        colors.forEach(name => {
            let menuItem = {
                label: name,
                type: 'radio',
                click: () => win.send('change-color', name),
                checked: name === choicedColor ? true : false
            };
            template.push(menuItem);
        });

        return template;
    }
}