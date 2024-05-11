import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { routes } from './routes';

const router = createBrowserRouter(routes);

// mount the app to a DOM element
const root = document.getElementById('app')!;
const app = <RouterProvider router={router} fallbackElement={null} />;
const context = {};

// ReactDOM.createRoot(root!).render(app);
ReactDOM.hydrateRoot(root, app, context);
