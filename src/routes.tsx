import { Route, Routes } from 'react-router-dom';
import NotFoundPage from '@/NotFound';
import Root from '@/pages/page';
import { DynamicPages, ErrorBoundary } from '@/utils/pages';

export const routes = [
  { path: '*', element: <NotFoundPage />, errorElement: <ErrorBoundary /> },
  { path: '/', element: <Root />, errorElement: <ErrorBoundary /> },
  { path: '/tests/*', element: <DynamicPages />, errorElement: <ErrorBoundary /> },
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
