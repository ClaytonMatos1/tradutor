const { ipcMain, ipcRenderer } = require('electron');

const colors = require('../domain/colors');
const LocalStorageUtils = require('../utils/localStorageUtils');

const isMac = process.platform === 'darwin';

module.exports = {
    generateMainMenu () {
        let templateMenu = [
            {
                label: 'View',
                submenu: [
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
                        click: () => ipcRenderer.send('open-window-about'),
                        accelerator: 'CmdOrCtrl+H'
                    }
                ]
            }
        ];

        return templateMenu;
    },

    async trayTemplate (app, win) {
        const SEPARATOR = { type: 'separator' };
        let template = [
            { label: app.name }, SEPARATOR
        ];

        let menuColors = { label: 'Cores', submenu: [] };
        const choicedColor = await LocalStorageUtils.getStorageAppColor(win);
        colors.forEach(name => {
            let menuItem = {
                label: name,
                type: 'radio',
                click: () => win.send('change-color', name),
                checked: name === choicedColor ? true : false
            };
            menuColors.submenu.push(menuItem);
        });
        template.push(menuColors);

        template.push({
            label: 'Help',
            submenu: [
                {
                    label: 'About',
                    click: () => ipcMain.emit('open-window-about'),
                    accelerator: 'CmdOrCtrl+H'
                }
            ]
        });
        template.push(SEPARATOR);

        template.push({
            ...isMac ? { role: 'close' } : { role: 'quit' },
            type: 'normal'
        });

        return template;
    }
}