import ReactDomServer from 'react-dom/server';
import { createStaticHandler, createStaticRouter, StaticRouterProvider } from 'react-router-dom/server';
import type * as express from 'express';
import { routes } from '@/routes';

const createFetchRequest = (req: express.Request): Request => {
  const origin = `${req.protocol}://${req.get('host')}`;
  // Note: This had to take originalUrl into account for presumably vite's proxying
  const url = new URL(req.originalUrl || req.url, origin);

  const controller = new AbortController();
  req.on('close', () => controller.abort());

  const headers = new Headers();

  for (const [key, values] of Object.entries(req.headers)) {
    if (values) {
      if (Array.isArray(values)) {
        for (const value of values) {
          headers.append(key, value);
        }
      } else {
        headers.set(key, values);
      }
    }
  }

  const init: RequestInit = {
    method: req.method,
    headers,
    signal: controller.signal,
  };

  if (req.method !== 'GET' && req.method !== 'HEAD') {
    init.body = req.body;
  }

  return new Request(url.href, init);
};

const render = async (req: express.Request) => {
  const { query, dataRoutes } = createStaticHandler(routes);
  const fetchRequest = createFetchRequest(req);
  const context = await query(fetchRequest);

  if (context instanceof Response) {
    throw context;
  }

  const router = createStaticRouter(dataRoutes, context);
  const html = ReactDomServer.renderToString(<StaticRouterProvider router={router} context={context} />);
  return { html };
};

const _export = {
  render,
  createFetchRequest,
};

export default _export;
