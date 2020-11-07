const APP_COLOR = 'appColor';

module.exports = {
    setStorageAppColor (window, color) {
        window.localStorage.setItem(APP_COLOR, color);
    },

    async getStorageAppColor (win) {
        let choicedColor = await win.webContents.executeJavaScript(`window.localStorage.getItem('${APP_COLOR}')`, true);
        choicedColor = choicedColor ? choicedColor : 'antiquewhite';
        return choicedColor;
    }
}