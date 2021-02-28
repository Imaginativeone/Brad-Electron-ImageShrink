const { app, BrowserWindow, Menu, globalShortcut } = require('electron');

// Set environment
process.env.NODE_ENV = 'development';

const isDev = process.env.NODE_ENV !== 'production' ? true : false;
const isMac = process.platform === 'darwin' ? true : false;

console.log('process.platform', process.platform);
console.log('isMac', isMac);

let mainWindow;

function createMainWindow() {

  mainWindow = new BrowserWindow({

    title: 'ImageShrink',
    width: 500,
    height: 600,
    icon: './assets/icons/Icon_256x256.png',

    resizable: isDev ? false : true,

    webPreferences: { contextIsolation: true }

  });
  
  // mainWindow.loadURL(`file://${__dirname}/app/index.html`);
  mainWindow.loadFile('./app/index.html');
}

app.on('ready', () => {

  createMainWindow();

  const mainMenu = Menu.buildFromTemplate(menu);
  Menu.setApplicationMenu(mainMenu);

  globalShortcut.register('CmdOrCtrl+R', () => {
    mainWindow.reload();
  });

  globalShortcut.register('CmdOrCtrl+I', () => {
    mainWindow.toggleDevTools();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  })

});

const menu = [
  
  ...(isMac ? [{ role: 'appMenu' }] : []),

  {
    label: 'File',
    submenu: [{
      label: 'Quit',
      // accelerator: isMac ? 'Command+W' : 'Ctrl+W',
      accelerator: 'CmdOrCtrl+W',
      click: () => app.quit()
    }]

  }
];

// if (isMac) {
//   menu.unshift({ role: 'appMenu' });
// }

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    if (!isMac) {
      app.quit()
    }
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createMainWindow()
  }
})

// const { app, BrowserWindow } = require('electron')

// // Set environment
// // process.env.NODE_ENV = 'development'

// // const isDev = process.env.NODE_ENV !== 'production' ? true : false
// // const isMac = process.platform === 'darwin' ? true : false

// // console.log('isDev', isDev);
// // console.log('Platform', process.platform);

// // let mainWindow;

// function createMainWindow() {

//   // ElectronJS.org
//   const mainWindow = new BrowserWindow({
    
//     title: 'ImageShrink',
//     width: 500,
//     height: 600,
//     icon: `${__dirname}/assets/icons/Icon_256x256.png`

//   })

//   // mainWindow.loadURL(`file://${ __dirname }/app/index.html`);
//   mainWindow.loadFile('./app/index.html');
  
// }

// app.on('ready', createMainWindow);

// // app.on('window-all-closed', () => {
// //   if (process.platform !== 'darwin') {
// //     if (!isMac) {
// //       app.quit()
// //     }
// //   }
// // })

// // app.on('activate', () => {
// //   if (BrowserWindow.getAllWindows().length === 0) {
// //     createMainWindow()
// //   }
// // })
