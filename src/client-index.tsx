import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from '@/App';

const root = document.getElementById('root');
const app = (
  <React.StrictMode>
    <BrowserRouter future={{ v7_startTransition: true }}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// ReactDOM.createRoot(root!).render(app);
ReactDOM.hydrateRoot(root!, app);
