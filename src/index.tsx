import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Router } from '@/routes';

const root = document.getElementById('root')!;
const app = (
  <React.StrictMode>
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  </React.StrictMode>
);
const context = {};

// ReactDOM.createRoot(root!).render(app);
ReactDOM.hydrateRoot(root, app, context);
