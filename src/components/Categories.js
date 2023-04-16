import { getCategories, addCategory, removeCategory } from "@/modules/Data";
import { useState, useEffect } from "react"
import { useAuth } from "@clerk/nextjs";
import Link from 'next/link'

export default function Categories(){ 
  const { isLoaded, userId, sessionId, getToken } = useAuth();
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

  // Add a new category
  async function add() {
    const token = await getToken({ template: "codehooks" });
    const newCat = await addCategory(token, newCategory);
    setNewCategory("");
    setCategoryList(categoryList.concat(newCat));
  }

  // Delete a category
  async function remove(id) {
    const token = await getToken({ template: "codehooks" });
    try{
      await removeCategory(token, id);
    }
    catch(e){
      console.log("Error deleting category: ", e);
    }
    setCategoryList(await getCategories(token));
  }

  if(loading){
    return <div className="margin">Loading Categories...</div>
  }

  else{
    const htmlCategories = categoryList.map((item) => 
      <div key={item._id}>
        <li>
          <Link href={"/todos/"+item.category}>{item.category}</Link>
          <button type="buton" className="pure-button margin" onClick={(e) => remove(item._id)}>Delete</button>
        </li>
      </div>
    );
    return<>
      <h2>Categories</h2>
      <div className="margin">
        {htmlCategories}
      </div>
      <form className="pure-form">
        <fieldset>
          <legend>Add New Category</legend>
          <input name="newCategory" placeholder="Category Name" value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            onKeyDown={(e) => {if (e.key === 'Enter') {add()}}}/>
          <button type="button" onClick={add} className="pure-button pure-button-primary">Add</button>
        </fieldset>
      </form>
    </>
  }
}