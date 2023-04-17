import { useState, useEffect } from "react"
import { updateTodo, getCategories } from "@/modules/Data";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from 'next/router';


export default function EditableTodo({id, content, status, category}){ 
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  const [done, setDone] = useState(status);
  const [categoryList, setCategoryList] = useState([]);    
  const [loading, setLoading] = useState(true);
  const router = useRouter();

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

  // Update to-do
  async function updateTodoItem(e){
    e.preventDefault();

    // Disable button after submit
    let btn = document.getElementById("saveBtn");
    btn.disabled = true;

    // Set new to-do information
    let newContent = e.target.newItem.value;
    let newCategory = e.target.category.value
    const token = await getToken({ template: "codehooks" });
    await updateTodo(token, id, newContent, done, newCategory);
    btn.disabled = false;
    router.push('/todos');
  }

  // Reference: https://codeflarelimited.com/blog/dynamically-populate-select-options-in-react-js/
  function getOptions() {
    return categoryList.map((cat) => { 
      return <option key={cat._id} value={cat.category}>{cat.category}</option>;
    });
  }
  
  if(loading){
    return <div className="margin">Loading Todo Item...</div>
  }
  else{
    return (
      <>
      <form className="pure-form" method="post" onSubmit={updateTodoItem}>
        <div className="todoItem">
          <input className="margin" checked={done} type="checkbox" onChange={(e) => setDone(!done)}/>
          <textarea className="margin" name="newItem" defaultValue={content}/>
          <span>
          <label className="margin" htmlFor="category">Category:</label>
            <select defaultValue={category} className="margin" name="category" id="category">
              <option>None</option>
              {getOptions()}
            </select>
          </span>
          <button id="saveBtn" className="pure-button pure-button-primary margin" type="submit">Save Changes</button>
        </div>
      </form>
      </>
    )
  }
}