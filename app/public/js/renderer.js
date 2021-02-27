const { ipcRenderer } = require('electron');
const translate = require('google-translate-open-api');

const LocalStorageUtils = require('../../utils/localStorageUtils');

const tradButton = document.getElementById('btnTradutor');
const resultText = document.getElementById('resultText');
const copy = document.getElementById('copy');
tradButton.addEventListener('click', async () => {
    const element = document.getElementById('englishText');
    const text = element.value;

    if (text.length) {
        resultText.textContent = '';
        const response = await tradutor(text);
        resultText.textContent = response;
        copy.style.display = 'block';
    }
});

copy.addEventListener('click', (ev) => {
    ev.preventDefault();
    const selectionRange = document.createRange();
    const selection = window.getSelection();

    selectionRange.selectNode(resultText);
    selection.removeAllRanges();
    selection.addRange(selectionRange);
    document.execCommand('copy');
    selection.removeAllRanges();
});

async function tradutor(text) {
    const checked = document.querySelector('input[name="language"]:checked').value;
    const response = await translate.default(text, {
        from: checked,
        to: checked == 'en' ? 'pt' : 'en',
        browers: true
    });
    const data = response.data;
    return data;
}

const input = document.getElementById('englishText');
input.focus();
input.addEventListener('keyup', (ev) => {
    ev.preventDefault();
    if (ev.key === 'Enter') {
        document.getElementById('btnTradutor').click();
    }

    if (ev.key === 'Escape') {
        window.setTimeout(() => {
            if (input.value.length === 0) {
                resultText.textContent = '';
                copy.style.display = 'none';
            }
        }, 10);
    }
});
input.addEventListener('click', (ev) => {
    window.setTimeout(() => {
        if (input.value.length === 0) {
            resultText.textContent = '';
            copy.style.display = 'none';
        }
    }, 10);
});

ipcRenderer.on('change-color', (ev, color) => {
    setBackgroundColor(color);
    LocalStorageUtils.setStorageAppColor(window, color);
});

ipcRenderer.on('choiced-color', (ev, color) => {
    setBackgroundColor(color);
});

function setBackgroundColor (color) {
    let body = document.body;
    body.style.backgroundColor = color;
};

function initBackgroundColor () {
    let color = LocalStorageUtils.getWindowStorageAppColor(window);
    color = color ? color : 'antiquewhite';
    setBackgroundColor(color);
};
initBackgroundColor();

const rbLanguages = document.querySelectorAll('input[name="language"]');
rbLanguages.forEach(item => {
    item.addEventListener('click', () => {
        const checked = document.querySelector('input[name="language"]:checked').value;
        LocalStorageUtils.setStorageSelectedLanguage(window, checked);
    });
});
function setSelectedLanguage () {
    let selectedLanguage = LocalStorageUtils.getStorageSelectedLanguage(window);
    if (!selectedLanguage) selectedLanguage = 'en';
    document.getElementById(`language-${selectedLanguage}`).checked = true;
    LocalStorageUtils.setStorageSelectedLanguage(window, selectedLanguage);
}
setSelectedLanguage();
