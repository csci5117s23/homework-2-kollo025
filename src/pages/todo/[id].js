import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useEffect } from "react"
import { useAuth } from "@clerk/nextjs";
import { getTodo } from "@/modules/Data";

import EditableTodo from '@/components/EditableTodo'

export default function TodoID() {
  const router = useRouter()
  const { id } = router.query
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  
  // Set states
  const [todo, setTodo] = useState(null);
  const [loading, setLoading] = useState(true);

  // Get todo with specific id
  useEffect(() => {
    async function todoByID() {
      if (userId) {
        try{
          const token = await getToken({ template: "codehooks" });
          let item = await getTodo(token, id);

          // This was not a valid to-do id
          if(item.code){
            router.push("/404")
          }
          else{
            setTodo(item);
            setLoading(false);
          }
        }
        catch(e){
          console.log("Error")
        }
      }
    }
    todoByID();
  }, [isLoaded]);

  if(loading){
    return <div>Loading to-do item...</div>
  }
  else{
    return (
      <>
      <EditableTodo id={todo._id} content={todo.content} status={todo.done} category={todo.category}></EditableTodo>
      <Link href="/todos"><button className="pure-button">Not Done To-do Items</button></Link>
      </>
    )
  }
}