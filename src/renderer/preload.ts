import { contextBridge, ipcRenderer } from 'electron';

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
  // Example API methods
  getVersion: () => process.versions.electron,
  getPlatform: () => process.platform,
  
  // IPC communication examples
  sendMessage: (message: string) => ipcRenderer.invoke('send-message', message),
  onMessage: (callback: (message: string) => void) => {
    ipcRenderer.on('message-received', (_event, message) => callback(message));
  },
});

// Type definitions for the exposed API
declare global {
  interface Window {
    electronAPI: {
      getVersion: () => string;
      getPlatform: () => string;
      sendMessage: (message: string) => Promise<void>;
      onMessage: (callback: (message: string) => void) => void;
    };
  }
}