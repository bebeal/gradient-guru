import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom';
import { routes } from './routes';

const router = createBrowserRouter(routes);

const root = document.getElementById('app')!;
const app = <RouterProvider router={router} fallbackElement={null} />;

const context = {};

// ReactDOM.createRoot(root!).render(app);
ReactDOM.hydrateRoot(root, app, context);
