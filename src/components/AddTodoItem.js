import { useEffect } from "react"

export default function AddTodoItem({item}){ 
    // const [todoList, setTodoList] = useState(todoItems);
    // const htmlTodoList = todoList.map((todoItem) => <TodoItem id={todoItem.id} content={todoItem.content}></TodoItem>)
    let myContent = "";

    const API_ENDPOINT = "https://backend-ahul.api.codehooks.io/dev/todos"
    const API_KEY = "e54ecd9c-02c3-481f-a9ca-de4d5d6ecaa7"
    
    function handleSubmit(e) {
        e.preventDefault();
        myContent = e.target.newItem.value;
        console.log(myContent);
        fetchData();
    }

    const fetchData = async () => {
        try{
          const response = await fetch(API_ENDPOINT, {
            'method':'POST',
            'headers': {'x-apikey': API_KEY, 'Content-Type': 'application/json'},
            'body': JSON.stringify({'content': myContent})
          })
          const data = await response.json()
          console.log("Data: ", data)
  
        //   // Update state
        //   setTodos(data);
        //   setLoading(false);
        }
        catch(err){
          console.log("Error: ", err);
        }
    }


    return<>
        <h1>Add a New Todo Item</h1>
        <form method="post" onSubmit={handleSubmit}>
            <label>
                New Todo Item: <input name="newItem" defaultValue="Your new todo item" />
            </label>
            <button type="submit">Add</button>
        </form>
    </>
}