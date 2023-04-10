import { useState, useEffect } from "react"
import TodoItem from './TodoItem';

export default function Categories(){ 
    const [categoryList, setCategoryList] = useState(null);    
    const [loading, setLoading] = useState(true);

    const API_ENDPOINT = "https://backend-ahul.api.codehooks.io/dev/categories"
    const API_KEY = "e54ecd9c-02c3-481f-a9ca-de4d5d6ecaa7"

  // Get not-done todos
  useEffect(() => {
    const fetchData = async () => {
      try{
        const response = await fetch(API_ENDPOINT, {
          'method':'GET',
          'headers': {'x-apikey': API_KEY}
        });
        const data = await response.json();
        console.log("Data: ", data);

        // Update state
        setCategoryList(data);
        setLoading(false);
      }
      catch(err){
        console.log("Error: ", err);
      }
    }
    fetchData();
  }, [])

    return<>
        <h1>Categories</h1>
        <div>
            {/* {htmlTodoList} */}
        </div>
    </>
}