import { useState, useEffect } from "react"
import TodoItem from './TodoItem';
import { getTodos, getTodosByCat, addTodo } from "@/modules/Data";
import { useAuth } from "@clerk/nextjs";

export default function TodoList({done, category}){ 
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  const [todoList, setTodoList] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [loading, setLoading] = useState(true);
    
  // Get todos
  useEffect(() => {
    async function todos() {
      if (userId) {
        const token = await getToken({ template: "codehooks" });
        if(category != null){
          console.log(category)
          setTodoList(await getTodosByCat(token, done, category));
        }
        else{
          setTodoList(await getTodos(token, done));
        }
        setLoading(false);
      }
    }
    todos();
  }, [isLoaded]);

  // Add a new todo item
  async function add() {
    const token = await getToken({ template: "codehooks" });
    let newItem;
    if(category != null){
      newItem = await addTodo(token, newTodo, category);
    }
    else{
      newItem = await addTodo(token, newTodo);
    }
    setNewTodo("");
    setTodoList(todoList.concat(newItem));
  }

  if(loading){
    return <div>Loading Todos</div>
  }

  else{
    const htmlTodoList = todoList.map((todoItem) => <TodoItem id={todoItem._id} content={todoItem.content} status={todoItem.done} editable={false}></TodoItem>)
    // If these are done todos, don't include an add button
    if(done){
      return <div>{htmlTodoList}</div>
    }
    else{
      return <>
        <div>{htmlTodoList}</div>
        <form className="pure-form">
          <fieldset>
            <legend>Add New Todo Item</legend>
            <input name="newItem" placeholder="Todo Content" value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyDown={(e) => {if (e.key == 'Enter') {add()}}}/>
            <button type="button" onClick={add} className="pure-button pure-button-primary">Add</button>
          </fieldset>
        </form>
      </>
    }
  }
}