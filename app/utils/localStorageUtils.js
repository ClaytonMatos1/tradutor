const APP_COLOR = 'appColor';
const SELECTED_LANGUAGE = 'selectedLanguage';

module.exports = {
    setStorageAppColor (window, color) {
        window.localStorage.setItem(APP_COLOR, color);
    },

    async getStorageAppColor (win) {
        let choicedColor = await win.webContents.executeJavaScript(`window.localStorage.getItem('${APP_COLOR}')`, true);
        choicedColor = choicedColor ? choicedColor : 'antiquewhite';
        return choicedColor;
    },

    getWindowStorageAppColor (window) {
        return window.localStorage.getItem(APP_COLOR);
    },

    setStorageSelectedLanguage (window, selected) {
        window.localStorage.setItem(SELECTED_LANGUAGE, selected);
    },

    getStorageSelectedLanguage (window) {
        return window.localStorage.getItem(SELECTED_LANGUAGE);
    }
}