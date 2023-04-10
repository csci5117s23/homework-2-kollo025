import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useEffect } from "react"
import TodoItem from '@/components/TodoItem'

export default function TodoID() {
  const router = useRouter()
  const { id } = router.query

  if(Number.isInteger(id)){
    console.log("int")
  }
  else{
    console.log("not an int")
  }

  console.log(id)

  const API_ENDPOINT = "https://backend-ahul.api.codehooks.io/dev/todos/"+id
  const API_KEY = "e54ecd9c-02c3-481f-a9ca-de4d5d6ecaa7"

  // Set states
  const [todo, setTodo] = useState(null);
  const [loading, setLoading] = useState(true);

  // Get not-done todos
  useEffect(() => {
    const fetchData = async () => {
      try{
        const response = await fetch(API_ENDPOINT, {
          'method':'GET',
          'headers': {'x-apikey': API_KEY}
        });
        const data = await response.json();
        console.log("Data: ", data);

        // Update state
        setTodo(data);
        setLoading(false);
      }
      catch(err){
        console.log("Error: ", err);
      }
    }
    fetchData();
  }, [])

  if(loading){
    console.log("Loading")
  }
  else{
    console.log(todo)
    return (
      <>
      <TodoItem id={todo._id} content={todo.content} status={todo.done} editable={true}></TodoItem>
      <Link href="/todos"><button>View Not Done To-dos</button></Link>
      </>
    )
  }
}