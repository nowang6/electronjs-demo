import { app, BrowserWindow } from 'electron';
import * as path from 'path';

class ElectronApp {
  private mainWindow: BrowserWindow | null = null;

  constructor() {
    this.initializeApp();
  }

  private initializeApp(): void {
    // This method will be called when Electron has finished initialization
    app.whenReady().then(() => {
      this.createWindow();

      app.on('activate', () => {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) {
          this.createWindow();
        }
      });
    });

    // Quit when all windows are closed, except on macOS
    app.on('window-all-closed', () => {
      if (process.platform !== 'darwin') {
        app.quit();
      }
    });
  }

  private createWindow(): void {
    // Create the browser window
    this.mainWindow = new BrowserWindow({
      width: 1200,
      height: 800,
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true,
        preload: path.join(__dirname, '../renderer/preload.js'),
      },
    });

    // Load the app
    if (process.env.NODE_ENV === 'development') {
      this.mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'));
      // Open the DevTools in development
      this.mainWindow.webContents.openDevTools();
    } else {
      this.mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'));
    }

    // Emitted when the window is closed
    this.mainWindow.on('closed', () => {
      this.mainWindow = null;
    });
  }
}

// Initialize the application
new ElectronApp();