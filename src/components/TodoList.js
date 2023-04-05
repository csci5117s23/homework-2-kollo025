import { useState } from "react"
import TodoItem from './TodoItem';

export default function TodoList({todoItems}){ 
    const [todoList, setTodoList] = useState(todoItems);
    const htmlTodoList = todoList.map((todoItem) => <TodoItem id={todoItem.id} content={todoItem.content}></TodoItem>)
    
    return<>
        <div>
            {htmlTodoList}
        </div>
    </>
}