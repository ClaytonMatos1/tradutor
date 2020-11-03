const translate = require('google-translate-open-api');

const tradButton = document.getElementById('btnTradutor');
const resultText = document.getElementById('resultText');
tradButton.addEventListener('click', async () => {
    const element = document.getElementById('englishText');
    const text = element.value;

    if (text.length) {
        const response = await tradutor(text);
        console.log(response);
        resultText.textContent = response;
    } else {
        console.log('vazio');
    }
});

async function tradutor(text) {
    const response = await translate.default(text, {
        to: 'pt'
    });
    const data = response.data[0];
    return data;
}