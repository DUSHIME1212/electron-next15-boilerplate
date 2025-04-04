import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electron', {
  // Example API methods
  doThing: () => ipcRenderer.send('do-a-thing'),
  onThingDone: (callback: (event: Electron.IpcRendererEvent, ...args: unknown[]) => void) => ipcRenderer.on('thing-done', callback),
  // Add more APIs as needed
});