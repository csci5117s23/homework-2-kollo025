import TodoList from '@/components/TodoList'
import Link from 'next/link'

export default function DoneTodos() {
  return (
    <>
    <h1 className="header">
      Done To-do Items
    </h1>
    <TodoList done={true}></TodoList>
    <Link href="/todos"><button className="pure-button">Not Done To-do Items</button></Link>
    </>
  )
}