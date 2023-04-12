import { useState, useEffect } from "react"
import TodoItem from './TodoItem';
import { getTodosByCat, addTodo } from "@/modules/Data";
import { useAuth } from "@clerk/nextjs";

export default function TodoListCategory({done, category}){ 
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  const [todoList, setTodoList] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [loading, setLoading] = useState(true);
    
  // Get todos by category
  useEffect(() => {
    async function todos() {
      if (userId) {
        const token = await getToken({ template: "codehooks" });
        setTodoList(await getTodosByCat(token, done, category));
        setLoading(false);
      }
    }
    todos();
  }, [isLoaded]);

  // Add a new todo item
  async function add() {
    const token = await getToken({ template: "codehooks" });
    const newItem = await addTodo(token, newTodo);
    setNewTodo("");
    setTodoList(todoList.concat(newItem));
  }

  if(loading){
    return <div>Loading Todos</div>
  }

  else{
    const htmlTodoList = todoList.map((todoItem) => <TodoItem id={todoItem._id} content={todoItem.content} status={todoItem.done} editable={false}></TodoItem>)
    if(done){
      return <div>{htmlTodoList}</div>
    }
    else{
      return <>
        <div>{htmlTodoList}</div>
        <h1>Add a New Todo Item</h1>
        <input name="newItem" placeholder="To-do Content" value={newTodo} 
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyDown={(e) => {if (e.key == 'Enter') {add()}}}/>
        <button onClick={add}>Add</button>
      </>
    }
  }
}