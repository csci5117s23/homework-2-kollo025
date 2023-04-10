import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useEffect } from "react"
import { useAuth } from "@clerk/nextjs";
import { getTodo } from "@/modules/Data";

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

  const { isLoaded, userId, sessionId, getToken } = useAuth();
  
  // Set states
  const [todo, setTodo] = useState(null);
  const [loading, setLoading] = useState(true);

  // Get todo with specific id
  useEffect(() => {
    async function todoByID() {
      if (userId) {
        const token = await getToken({ template: "codehooks" });
        setTodo(await getTodo(token, id));
        setLoading(false);
      }
    }
    todoByID();
  }, [isLoaded]);

  if(loading){
    console.log("Loading")
  }
  else{
    return (
      <>
      <TodoItem id={todo._id} content={todo.content} status={todo.done} editable={true}></TodoItem>
      <Link href="/todos"><button>View Not Done To-dos</button></Link>
      </>
    )
  }
}