const { app, ipcRenderer, shell } = require('electron');

let versionApp = document.getElementById('versionApp');
window.onload = () => {
    versionApp.textContent = app.getVersion();
};

let linkGithub = document.getElementById('linkGithub');
linkGithub.addEventListener('click', () => {
    shell.openExternal('https://github.com/ClaytonMatos1');
});

let linkClose = document.getElementById('linkClose');
linkClose.addEventListener('click', () => {
    ipcRenderer.send('close-window-about');
});