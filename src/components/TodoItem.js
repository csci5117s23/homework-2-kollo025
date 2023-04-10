import { useState } from "react"
import Link from 'next/link'

export default function TodoItem({id, content, status, editable}){ 
    const [done, setDone] = useState(status);


    const API_ENDPOINT = "https://backend-ahul.api.codehooks.io/dev/todos/"+id
    const API_KEY = "e54ecd9c-02c3-481f-a9ca-de4d5d6ecaa7"
  
    // Function to change the state
    async function toggleDone(){
        try{
            console.log("In function: ", done)
            const response = await fetch(API_ENDPOINT, {
              'method':'PATCH',
              'headers': {'x-apikey': API_KEY, 'Content-Type': 'application/json'},
              'body': JSON.stringify({'done': !done})
            })
            const data = await response.json()
            setDone(!done)
            console.log("Data: ", data)
        }
        catch(err){
            console.log("Error: ", err);
        }
    }

    // Update to-do content
    async function updateContent(e){
        e.preventDefault();
        let newContent = e.target.newItem.value;
        try{
            console.log("In function: ", done)
            const response = await fetch(API_ENDPOINT, {
              'method':'PATCH',
              'headers': {'x-apikey': API_KEY, 'Content-Type': 'application/json'},
              'body': JSON.stringify({'content': newContent})
            })
            const data = await response.json()
            console.log("Data: ", data)
        }
        catch(err){
            console.log("Error: ", err);
        }
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