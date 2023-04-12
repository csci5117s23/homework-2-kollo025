import { useState } from "react"
import Link from 'next/link'
import { updateTodoStatus, updateTodoContent } from "@/modules/Data";
import { useAuth } from "@clerk/nextjs";


export default function TodoItem({id, content, status, editable}){ 
    const { isLoaded, userId, sessionId, getToken } = useAuth();
    const [done, setDone] = useState(status);

    // Toggle to-do completion status
    async function toggleDone(){
        const token = await getToken({ template: "codehooks" });
        const newItem = await updateTodoStatus(token, id, !done);
        setDone(!done)
    }

    // Update to-do content
    async function updateContent(e){
        e.preventDefault();
        let newContent = e.target.newItem.value;
        const token = await getToken({ template: "codehooks" });
        const newItem = await updateTodoContent(token, id, newContent);

    }
    
    if(editable){
        return (
            <>
            <form method="post" onSubmit={updateContent}>
                <div className="todoItem">
                    <input checked={done} type="checkbox" onChange={toggleDone}/>
                    <textarea name="newItem" defaultValue={content}/>
                    <button type="submit">Save Content</button>
                </div>
            </form>
            </>
        )
    }
    else{
        return (
            <>
            <div className="todoItem">
                <input checked={done} type="checkbox" onChange={toggleDone}/>
                <Link href={"/todos/"+id}><span className="margin-left">{content}</span></Link>
            </div>
            </>
        )
    }
}