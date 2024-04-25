import { Suspense } from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <Suspense fallback={null}>
      <div className="flex flex-col w-full h-full bg-primary overflow-auto justify-center items-center">
        <h2>Not Found</h2>
        <p>Could not find requested resource</p>
        <Link to="/">/ (Root)</Link>
      </div>
    </Suspense>
  );
};

export default NotFoundPage;
