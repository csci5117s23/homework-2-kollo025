import { useState } from "react"
import TodoItem from './TodoItem';

export default function AddTodoItem({item}){ 
    // const [todoList, setTodoList] = useState(todoItems);
    // const htmlTodoList = todoList.map((todoItem) => <TodoItem id={todoItem.id} content={todoItem.content}></TodoItem>)
    function handleSubmit(e) {
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