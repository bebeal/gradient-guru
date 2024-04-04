import Link from 'next/link'
import { Suspense } from 'react';
 
const NotFoundPage = () => {
  return (
    <Suspense fallback={null}>
      <div className="flex flex-col w-full h-full bg-primary overflow-auto justify-center items-center">
        <h2>Not Found</h2>
        <p>Could not find requested resource</p>
        <Link href="/">Return from /</Link>
      </div>
    </Suspense>
  )
};

export default NotFoundPage;
