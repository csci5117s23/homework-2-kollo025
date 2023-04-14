import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useEffect } from "react"
import TodoList from '@/components/TodoList'

export default function TodosByCategory() {
  const router = useRouter()
  const { category } = router.query

  return (
    <>
    <h1 className="header">
      Not Done To-dos - {category} Category
    </h1>
    <TodoList done={false} category={category}></TodoList>
    <Link href="/todos"><button className="pure-button">View All Not Done Todos ??? </button></Link>
    </>
  )
}