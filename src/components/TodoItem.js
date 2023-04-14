import { useState, useEffect } from "react"
import Link from 'next/link'
import { updateTodoStatus, updateTodoContent, updateTodo, getCategories } from "@/modules/Data";
import { useAuth } from "@clerk/nextjs";


export default function TodoItem({id, content, status, editable}){ 
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  const [done, setDone] = useState(status);
  const [categoryList, setCategoryList] = useState([]);    
  const [loading, setLoading] = useState(true);
  const [newCategory, setNewCategory] = useState("");

  // Get categories
  useEffect(() => {
    async function categories() {
      if (userId) {
        const token = await getToken({ template: "codehooks" });
        setCategoryList(await getCategories(token));
        setLoading(false);
      }
    }
    categories();
  }, [isLoaded]);

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
    let newCategory = e.target.category.value
    console.log(newCategory)
    const token = await getToken({ template: "codehooks" });
    
    if(newCategory == "None"){
      const newItem = await updateTodoContent(token, id, newContent);
    }
    else{
      const newItem = await updateTodo(token, id, newContent, newCategory);
    }
  }


  // Reference: https://codeflarelimited.com/blog/dynamically-populate-select-options-in-react-js/
  function getOptions() {
    return categoryList.map((cat) => {
      return <option value={cat.category}>{cat.category}</option>;
    });
  }
  
  if(editable && !loading){
    return (
      <>
      <form method="post" onSubmit={updateContent}>
        <div className="todoItem">
          <input checked={done} type="checkbox" onChange={toggleDone}/>
          <textarea name="newItem" defaultValue={content}/>
          <label for="category">Category</label>
            <select name="category" id="category"
              onChange={(e) => setNewCategory(e.target.value)}>
              <option>None</option>
              {getOptions()}
            </select>
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
        <Link href={"/todo/"+id}><span className="margin">{content}</span></Link>
      </div>
      </>
    )
  }
}