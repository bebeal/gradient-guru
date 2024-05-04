#!/usr/bin/env node

import express from 'express';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

// import api from './server/app.js';

const __dirname: string = path.dirname(fileURLToPath(import.meta.url));
const isTest = process.env.VITEST;
const isProd = process.env.NODE_ENV === 'production';
const root: string = process.cwd();
const port: number = parseInt(process.env.PORT || '3407');

const resolve = (_path: string) => path.resolve(__dirname, _path);

const indexProd: string = isProd ? fs.readFileSync(resolve('client/index.html'), 'utf-8') : '';

const createServer = async () => {
  const app = express();

  let vite: any;

  if (!isProd) {
    vite = await (
      await import('vite')
    ).createServer({
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
  }

  if (isProd) {
    app.use((await import('compression')).default());

    app.use(
      (await import('serve-static')).default(resolve('./client'), {
        index: false,
      }),
    );
  }

  // api routes
  // app.use('/api', api.router);

  app.use('*', async (req, res) => {
    try {
      const url = req.originalUrl;

      let template, render;

      if (!isProd) {
        template = fs.readFileSync(resolve('index.html'), 'utf8');
        template = await vite.transformIndexHtml(url, template);

        render = (await vite.ssrLoadModule('/server/index.tsx')).default.render;
      }

      if (isProd) {
        template = indexProd;

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        render = (await import('../server/index.js')).default.render;
      }

      const context: any = {};
      const appHtml = await render(req);
      const { helmet } = appHtml;

      if (context.url) return res.redirect(301, context.url);

      let html = template.replace('<!--app-html-->', appHtml.html);

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
