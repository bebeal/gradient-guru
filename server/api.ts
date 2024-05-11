import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import express, { Router } from 'express';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

class Api {
  public router: Router = express.Router();

  constructor() {
    this.router.get('/', (req, res) => {
      res.send('Welcome to the API!');
    });
    this.loadApiRoutes(path.join(__dirname, 'api'));
  }

  // parse api/* to extract api routes
  private async loadApiRoutes(dir: string, prefix = '/api', depth = 0) {
    const MAX = 3;
    if (depth > MAX) return;
    const files = await fs.promises.readdir(dir, { withFileTypes: true });
    for (const file of files) {
      const filePath = path.join(dir, file.name);
      if (file.isDirectory()) {
        await this.loadApiRoutes(filePath, `${prefix}/${file.name}`, depth + 1);
      } else if (file.isFile() && file.name.endsWith('.ts')) {
        const routePath = `${prefix}/${file.name.slice(0, -3).replace(/\[(\w+)\]/g, ':$1')}`;
        try {
          const module = await import(filePath);
          if (module.default) {
            const handler = module.default;
            this.router.get(routePath.replace('/api', ''), handler);
            console.log(`${routePath} loaded`, handler);
          }
        } catch (error) {
          console.error(`Error loading module ${routePath}:`, error);
        }
      }
    }
  }
}

const api = new Api();

export default api;
