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
        console.log("cats: ", categoryList) // ??? 
      }
    }
    categories();
  }, [isLoaded]);

  // Add a new category
  async function add() {
    const token = await getToken({ template: "codehooks" });
    const newCat = await addCategory(token, newCategory);
    console.log("new cat: ", newCat)
    setNewCategory("");
    setCategoryList(categoryList.concat(newCat));
    console.log("cat list: ", categoryList);
  }

  // Delete a category
  async function remove(id) {
    const token = await getToken({ template: "codehooks" });
    const newCat = await removeCategory(token, id);
    console.log(newCat)
    console.log("here")
    console.log(categoryList)
    // setCategoryList(categoryList.concat(newCat)); ???
    // need to remove item ???
  }

  if(loading){
    return <div>Loading Categories</div>
  }

  else{
    const htmlCategories = categoryList.map((item) => 
      <div><li><Link href={"/todos/"+item.category}>{item.category}</Link></li>
      <button onClick={(e) => remove(item._id)}>delete</button></div>
    );
    return<>
      <h2>Categories</h2>
      <div className="margin">
        {htmlCategories}
      </div>
      <form className="pure-form">
        <fieldset>
          <legend>Add a New Category</legend>
          <input name="newCategory" placeholder="Category Name" value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            onKeyDown={(e) => {if (e.key == 'Enter') {add()}}}/>
          <button type="button" onClick={add} className="pure-button pure-button-primary">Add</button>
        </fieldset>
      </form>
    </>
  }
}