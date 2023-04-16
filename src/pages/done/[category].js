import Link from 'next/link'
import { useRouter } from 'next/router'
import TodoList from '@/components/TodoList'

export default function TodosByCategory() {
  const router = useRouter()
  const { category } = router.query

  console.log(category)

  return (
    <>
    <h1 className="header">
      Done To-do Items - {category} Category
    </h1>
    <TodoList done={true} category={category}></TodoList>
    <Link href="/todos"><button className="pure-button">Not Done To-do Items</button></Link>
    </>
  )
}