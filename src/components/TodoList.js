import { useState, useEffect } from "react"
import TodoItem from './TodoItem';
import { getTodos, addTodo, getCategories } from "@/modules/Data";
import { useAuth } from "@clerk/nextjs";

export default function TodoList({done}){ 
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  const [todoList, setTodoList] = useState([]);
  const [categoryList, setCategoryList] = useState([]); // BADD ???

  const [newTodo, setNewTodo] = useState("");
  const [loading, setLoading] = useState(true);
    
  // Get todos
  useEffect(() => {
    async function todos() {
      if (userId) {
        const token = await getToken({ template: "codehooks" });
        setTodoList(await getTodos(token, done));
        // setLoading(false); // ???
      }
    }
    todos();
  }, [isLoaded]);


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
        <h2>Add a New Todo Item</h2>
        <form className="pure-form">
          <fieldset>
            <legend>Add New Todo Item</legend>
            <input name="newItem" placeholder="Todo Content" value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyDown={(e) => {if (e.key == 'Enter') {add()}}}/>
            <button type="button" onClick={add} className="pure-button pure-button-primary">Add</button>
            <label for="category">Category</label>
            <select id="category">
              <option>AL</option>
              <option>CA</option>
              <option>IL</option>
            </select>
          </fieldset>
        </form>
      </>
    }
  }
}