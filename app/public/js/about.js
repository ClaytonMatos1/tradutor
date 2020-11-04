const pack = require('../../../package.json');
const { ipcRenderer, shell } = require('electron');

let versionApp = document.getElementById('versionApp');
versionApp.textContent = pack.version;

let linkGithub = document.getElementById('linkGithub');
linkGithub.addEventListener('click', () => {
    shell.openExternal('https://github.com/ClaytonMatos1');
    window.setTimeout(() => {
        ipcRenderer.send('close-window-about');
    }, 100);
});

let linkClose = document.getElementById('linkClose');
linkClose.addEventListener('click', () => {
    ipcRenderer.send('close-window-about');
});