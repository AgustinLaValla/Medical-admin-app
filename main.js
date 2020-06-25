const { app, BrowserWindow, nativeImage } = require('electron');
const url = require('url');
const path = require('path');

let win = null;

app.on('ready', () => {
    win = new BrowserWindow({
        width: 1400,
        height: 1000,
        frame:false,
        icon:path.join(__dirname, 'assets', 'icon.ico'),
        resizable: false
    });

    win.loadURL(url.format({
        pathname: path.join(__dirname, 'dist/consultorio-ayacucho-app/index.html'),
        protocol:'file:',
        slashes:true,
    }));

    win.on('closed', () => win = null);

});

app.on('activate', () => {
    if(win === null) { 
        createWindow();
    }
});

app.on('window-all-closed', () => {
    if(process.platform != 'darwin') { 
        app.quit();
    };
});