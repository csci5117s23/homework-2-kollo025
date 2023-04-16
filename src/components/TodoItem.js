import { useState, useEffect } from "react"
import Link from 'next/link'
import { updateTodoStatus } from "@/modules/Data";
import { useAuth } from "@clerk/nextjs";

export default function TodoItem({id, content, status, editable}){ 
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  const [done, setDone] = useState(status);

  // Toggle to-do completion status
  async function toggleDone(){
    const token = await getToken({ template: "codehooks" });
    await updateTodoStatus(token, id, !done);
    setDone(!done)
  }

  return (
    <>
      <div className="todoItem">
        <input checked={done} type="checkbox" onChange={toggleDone}/>
        <Link href={"/todo/"+id}><span className="margin">{content}</span></Link>
      </div>
    </>
  )
}