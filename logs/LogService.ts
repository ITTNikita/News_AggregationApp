import * as fs from 'fs';
import * as path from 'path';

const logFilePath = path.join(__dirname, 'app.log');

export function logMessage(message: string): void {
  const timestamp = new Date().toISOString();
  const fullMessage = `[${timestamp}] ${message}\n`;

  fs.appendFile(logFilePath, fullMessage, (err) => {
    if (err) {
      console.error('Failed to write to log file:', err);
    }
  });
}
