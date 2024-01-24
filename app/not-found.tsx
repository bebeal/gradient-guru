import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className="flex w-full h-full bg-primary overflow-auto justify-center items-center">
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/">Return Home</Link>
    </div>
  )
}