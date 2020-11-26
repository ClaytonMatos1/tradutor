const customTitlebar = require('custom-electron-titlebar');
const { remote } = require('electron/renderer');
const template = require('./template');

window.addEventListener('DOMContentLoaded', () => {
    const titleBar = new customTitlebar.Titlebar({
        backgroundColor: customTitlebar.Color.fromHex('#444444'),
        icon: `../app/public/img/icon.ico`
    });
    let templateMenu = template.generateMainMenu();
    const mainMenu = new remote.Menu();
    for (let i = 0; i < templateMenu.length; i++) {
        const element = templateMenu[i];
        mainMenu.append(new remote.MenuItem(element));
    }
    titleBar.updateMenu(mainMenu);
});
