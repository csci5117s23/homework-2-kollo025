import TodoList from '@/components/TodoList'
import Categories from '@/components/Categories'
import Link from 'next/link'

export default function NotDoneTodos() {
  return (
    <>
    <h1 className="header">
      To-do List
    </h1>
    <Categories></Categories>
    <TodoList done={false}></TodoList>
    <div>
      <Link href="/done"><button className="pure-button">Done To-do Items</button></Link>
    </div>
    </>
  )
}