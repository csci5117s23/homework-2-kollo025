import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useEffect } from "react"
import TodoList from '@/components/TodoList'

export default function TodosByCategory() {
  const router = useRouter()
  const { category } = router.query

  console.log(category)

  return (
    <>
    <h1 className="header">
      Done To-dos - {category} Category
    </h1>
    <TodoList done={true} category={category}></TodoList>
    <Link href="/todos"><button className="pure-button">View Not Done To-dos ??? </button></Link>
    </>
  )
}