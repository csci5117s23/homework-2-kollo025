import { useState } from "react"
import Link from 'next/link'

export default function TodoItem({id, content}){ 
    const [done, setDone] = useState(false);
        
    // Function to change the state
    function toggleDone(){
        setDone(!done);
    }

    // if(done){}
    return (
        <>
        <div class="todoItem" onChange={toggleDone}>
            <input type="checkbox"/>
            <Link href={"/todos/"+id}><span class="margin-left">{content}</span></Link>
        </div>
        </>
    )
    // else{}
}