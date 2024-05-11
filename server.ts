#!/usr/bin/env node
import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import api from '@server/api';
import express from 'express';

const __dirname: string = path.dirname(fileURLToPath(import.meta.url));
const isTest = process.env.VITEST;
const isProd = process.env.NODE_ENV === 'production';
const root: string = process.cwd();
const port: number = parseInt(process.env.PORT || '3407');

const resolve = (_path: string) => path.resolve(__dirname, _path);

const indexProd: string = isProd ? fs.readFileSync(resolve('client/index.html'), 'utf-8') : '';

const createServer = async () => {
  // Create http server
  const app = express();

  let vite: any;

  // Add Vite or respective production middlewares
  if (!isProd) {
    const { createServer } = await import('vite');
    vite = await createServer({
      root,
      logLevel: isTest ? 'error' : 'info',
      server: {
        middlewareMode: true,
        watch: {
          usePolling: true,
          interval: 100,
        },
      },
      appType: 'custom',
    });
    app.use(vite.middlewares);
  } else {
    app.use((await import('compression')).default());
    app.use(
      (await import('serve-static')).default(resolve('./client'), {
        index: false,
      }),
    );
  }

  // api routes
  app.use('/api', api.router);

  // Serve HTML
  app.use('*', async (req, res) => {
    try {
      const url = req.originalUrl;
      let template, render;

      if (!isProd) {
        // Always read fresh template in development
        template = fs.readFileSync(resolve('index.html'), 'utf8');
        template = await vite.transformIndexHtml(url, template);
        render = (await vite.ssrLoadModule('/server/index.tsx')).default.render;
      } else {
        template = indexProd;
        // @ts-ignore
        render = (await import('../server/index.js')).default.render;
      }

      const context: any = {};
      const rendered = await render(req);
      if (context.url) return res.redirect(301, context.url);
      const html = template.replace('<!--app-html-->', rendered.html).replace('<!--app-head-->', rendered.head);

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
    } catch (e: any) {
      !isProd && vite.ssrFixStacktrace(e);
      console.log(e.stack);
      res.status(500).end(e.stack);
    }
  });

  return { app, vite };
};

if (!isTest) {
  createServer().then(({ app }) => {
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  });
}
