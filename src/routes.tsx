import { Route, Routes, type RouteObject } from 'react-router-dom';
import { App } from '@/App';
import NotFound from '@/pages/not-found/page';
import Root from '@/pages/page';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <Root />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
];