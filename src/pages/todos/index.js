import { useState, useEffect } from "react"
import { useAuth } from "@clerk/nextjs";
import { getTodos, addTodo } from "@/modules/Data";

import TodoList from '@/components/TodoList'
import Categories from '@/components/Categories'
import Link from 'next/link'

export default function NotDoneTodos() {
  const { isLoaded, userId, sessionId, getToken } = useAuth();

  // Set states
  const [todos, setTodos] = useState(null);
  const [newTodo, setNewTodo] = useState("");
  const [loading, setLoading] = useState(true);

  // Get not done todos
  useEffect(() => {
    async function notDoneTodos() {
      if (userId) {
        const token = await getToken({ template: "codehooks" });
        setTodos(await getTodos(token, false));
        setLoading(false);
      }
    }
    notDoneTodos();
  }, [isLoaded]);

  // Add a new todo item
  async function add() {
    const token = await getToken({ template: "codehooks" });
    const newItem = await addTodo(token, newTodo);
    setNewTodo("");
    setTodos(todos.concat(newItem));
  }

  if(loading){
    console.log("Loading")
  }
  else{
    console.log("Todos: ", todos);
    return (
      <>
      <h1 className="header">
        To-do List
      </h1>
      <Categories></Categories>
      <TodoList todoItems={todos}></TodoList>
      <Link href="/done"><button>View Done To-do Items</button></Link>

      <h1>Add a New Todo Item</h1>
      <input name="newItem" placeholder="To-do Content" value={newTodo} 
        onChange={(e) => setNewTodo(e.target.value)}
        onKeyDown={(e) => {if (e.key == 'Enter') {add()}}}/>
      <button onClick={add}>Add</button>
      </>
    )
  }
}