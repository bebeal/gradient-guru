import { Route, Routes, type RouteObject } from 'react-router-dom';
import NotFound from '@/pages/not-found/page';
import Root from '@/pages/page';

export const routes: RouteObject[] = [
  { path: '*', element: <NotFound /> },
  { path: '/', element: <Root /> },
];

export const Router = () => {
  return (
    <Routes>
      {routes.map(({ path, element, errorElement }) => (
        <Route key={path} path={path} element={element} errorElement={errorElement} />
      ))}
    </Routes>
  );
};
