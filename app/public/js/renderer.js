const { ipcRenderer } = require('electron');
const translate = require('google-translate-open-api');

const LocalStorageUtils = require('../../utils/localStorageUtils');

const tradButton = document.getElementById('btnTradutor');
const resultText = document.getElementById('resultText');
tradButton.addEventListener('click', async () => {
    const element = document.getElementById('englishText');
    const text = element.value;

    if (text.length) {
        const response = await tradutor(text);
        resultText.textContent = response;
    }
});

async function tradutor(text) {
    const response = await translate.default(text, {
        to: 'pt'
    });
    const data = response.data[0];
    return data;
}

const input = document.getElementById('englishText');
input.addEventListener('keyup', (ev) => {
    ev.preventDefault();
    if (ev.key === 'Enter') {
        document.getElementById('btnTradutor').click();
    }
});
input.focus();

function setBackgroundColor (color) {
    let body = document.body;
    body.style.backgroundColor = color;
}

ipcRenderer.on('change-color', (ev, color) => {
    setBackgroundColor(color);
    LocalStorageUtils.setStorageAppColor(window, color);
});

ipcRenderer.on('choiced-color', (ev, color) => {
    setBackgroundColor(color);
});
