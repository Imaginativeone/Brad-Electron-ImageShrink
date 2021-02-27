const { app, BrowserWindow } = require('electron');

function createMainWindow() {

  const mainWindow = new BrowserWindow({

    title: 'ImageShrink',
    width: 500,
    height: 600,

    webPreferences: {
      contextIsolation: true
    }

  });
  
}

app.on('ready', createMainWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    if (!isMac) {
      app.quit()
    }
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
