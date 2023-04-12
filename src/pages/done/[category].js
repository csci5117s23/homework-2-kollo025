import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useEffect } from "react"
import TodoListCategory from '@/components/TodoListCategory'

export default function TodosByCategory() {
  const router = useRouter()
  const { category } = router.query

  console.log(category)

  return (
    <>
    <h1 className="header">
      Done To-dos by Category
    </h1>
    <TodoListCategory done={true} category={category}></TodoListCategory>
    <Link href="/todos"><button>View Not Done To-dos ??? </button></Link>
    </>
  )
}