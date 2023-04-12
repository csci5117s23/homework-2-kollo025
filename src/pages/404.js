import Link from 'next/link'

export default function NotFound() {
  return (
    <>
      <h1>
        Error! Page not found
      </h1>
      <Link href="/todos"><button>Go Back to Todo List</button></Link>
    </>
  )
}
