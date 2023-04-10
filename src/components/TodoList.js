import { useState } from "react"
import TodoItem from './TodoItem';

export default function TodoList({todoItems}){ 
    const [todoList, setTodoList] = useState(todoItems);
    const htmlTodoList = todoList.map((todoItem) => <TodoItem id={todoItem._id} content={todoItem.content} status={todoItem.done} editable={false}></TodoItem>)
    
    return<>
        <div>
            {htmlTodoList}
        </div>
    </>
}