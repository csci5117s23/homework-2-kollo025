import TodoList from '@/components/TodoList'
import Link from 'next/link'

export default function DoneTodos() {
  return (
    <>
    <h1 className="header">
      Done To-dos
    </h1>
    <TodoList done={true}></TodoList>
    <Link href="/todos"><button>View Not Done To-dos</button></Link>
    </>
  )
}