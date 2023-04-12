import { getCategories, addCategory } from "@/modules/Data";
import { useState, useEffect } from "react"
import { useAuth } from "@clerk/nextjs";

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

  if(loading){
    return <div>Loading Categories</div>
  }

  else{
    const htmlCategories = categoryList.map((item) => <li>{item.category}</li>);
    return<>
      <h1>Categories</h1>
      <div>
        {htmlCategories}
        <h1>Add a New Category</h1>
        <input name="newCategory" placeholder="Category Name" value={newCategory} 
          onChange={(e) => setNewCategory(e.target.value)}
          onKeyDown={(e) => {if (e.key == 'Enter') {add()}}}/>
        <button onClick={add}>Add</button>
      </div>
    </>
  }
}