const { app, BrowserWindow, Menu } = require('electron');

// Set environment
process.env.NODE_ENV = 'development';

const isDev = process.env.NODE_ENV !== 'production' ? true : false;
const isMac = process.platform === 'darwin' ? true : false;

console.log('process.platform', process.platform);
console.log('isMac', isMac);

let mainWindow;
let aboutWindow;

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

function createAboutWindow() {

  aboutWindow = new BrowserWindow({

    title: 'About ImageShrink',
    width: 300,
    height: 300,
    icon: './assets/icons/Icon_256x256.png',

    resizable: false,
    backgroundColor: 'white',

    // webPreferences: { contextIsolation: true }

  });
  
  aboutWindow.loadFile('./app/about.html');
}

app.on('ready', () => {

  createMainWindow();

  const mainMenu = Menu.buildFromTemplate(menu);
  Menu.setApplicationMenu(mainMenu);

  mainWindow.on('closed', () => {
    mainWindow = null;
  })

});

const menu = [
  
  ...(isMac ? [
  { 
    label: app.name,
    submenu: [{
      label: 'About',
      click: createAboutWindow
    }]
  }] : []),

  {
    role: 'fileMenu'
  },
  
  { 
    label: 'Shopping',
    submenu: [
      { label: 'About' },
      { label: 'View Stores' },
      { label: 'Items on Sale' }
    ]
  },

  { 
    label: 'Home',
    submenu: [{
      label: 'About',
      click: createAboutWindow
    }]
  },

  ...(isDev ? [
    { 
      label: 'Developer',
      submenu: [
        { role: 'reload' }, 
        { role: 'forcereload' }, 
        { type: 'separator' }, 
        { role: 'toggledevtools' }
      ]
    }] : [])
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
