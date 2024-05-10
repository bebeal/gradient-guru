import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom';
import { App } from './App';
import { routes } from './routes';

const router = createBrowserRouter(routes);

const root = document.getElementById('root') as HTMLElement;
const app = (
  <React.StrictMode>
    <App>
      <RouterProvider router={router} fallbackElement={null} />
    </App>
  </React.StrictMode>
);
const context = {};

// ReactDOM.createRoot(root!).render(app);
ReactDOM.hydrateRoot(root, app, context);
