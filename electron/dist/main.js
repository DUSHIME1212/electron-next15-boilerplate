import { app, BrowserWindow, protocol, session } from 'electron';
import * as fs from 'fs';
import path from 'path';
import { createHandler } from 'next-electron-rsc';
let mainWindow = null; // Changed from const to let
async function createWindow() {
    const appPath = app.getAppPath();
    const isDev = process.env.NODE_ENV === 'development';
    try {
        const standaloneDir = path.join(appPath, '.next/standalone');
        if (!isDev && !fs.existsSync(standaloneDir)) {
            throw new Error('Standalone directory not found. Please run "npm run build" first.');
        }
        const { createInterceptor } = createHandler({
            standaloneDir,
            localhostUrl: 'http://localhost:3000',
            protocol
        });
        if (!isDev)
            createInterceptor({
                session: session.defaultSession
            });
    }
    catch (error) {
        if (error instanceof Error) {
            console.error('Handler initialization failed:', error.message);
        }
        else {
            console.error('Unknown error during handler initialization');
        }
        if (!isDev) {
            app.quit();
            return;
        }
    }
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        transparent: true,
        frame: false,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            sandbox: true,
            preload: path.join(appPath, 'electron/preload.js'),
            backgroundThrottling: false,
        },
    });
    if (isDev) {
        await mainWindow.loadURL('http://localhost:3000');
        mainWindow.webContents.openDevTools();
    }
    else {
        await mainWindow.loadFile(path.join(appPath, 'out/index.html'));
    }
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}
app.whenReady().then(createWindow).catch((error) => {
    console.error('Failed to create window:', error);
});
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
app.on('activate', () => {
    if (mainWindow === null) {
        createWindow().catch((error) => {
            console.error('Failed to create window on activate:', error);
        });
    }
});
