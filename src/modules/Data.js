const backend_base = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

// Get todos by completion status
export async function getTodos(authToken, done) {
    const result = await fetch(backend_base+"/todos?sort=createdOn&done="+done,{
        'method':'GET',
        'headers': {'Authorization': 'Bearer ' + authToken}
    })
    return await result.json();
}

// Get all todos
export async function getAllTodos(authToken) {
    const result = await fetch(backend_base+"/todos?sort=createdOn",{
        'method':'GET',
        'headers': {'Authorization': 'Bearer ' + authToken}
    })
    return await result.json();
}

// Get todo by id
export async function getTodo(authToken, id) {
    const result = await fetch(backend_base+"/todos/"+id,{
        'method':'GET',
        'headers': {'Authorization': 'Bearer ' + authToken}
    })
    return await result.json();
}

// Get todos by category
export async function getTodosByCat(authToken, done, category) {
    const result = await fetch(backend_base+"/todos?sort=createdOn&done="+done+"&category="+category,{
        'method':'GET',
        'headers': {'Authorization': 'Bearer ' + authToken}
    })
    return await result.json();
}

// Add todo
export async function addTodo(authToken, content, category) {
    const result = await fetch(backend_base+"/todos/",{
        'method':'POST',
        'headers': {'Authorization': 'Bearer ' + authToken,
        'Content-Type': 'application/json'},
        'body': JSON.stringify({'content': content, 'category': category})
        })
    return await result.json();
}

// Update todo's completion status
export async function updateTodoStatus(authToken, id, done) {
    const result = await fetch(backend_base+"/todos/"+id,{
        'method':'PATCH',
        'headers': {'Authorization': 'Bearer ' + authToken,
        'Content-Type': 'application/json'},
        'body': JSON.stringify({'done': done})
        })
    return await result.json();
}

// Update todo
export async function updateTodo(authToken, id, newContent, done, newCategory) {
    const result = await fetch(backend_base+"/todos/"+id,{
        'method':'PATCH',
        'headers': {'Authorization': 'Bearer ' + authToken,
        'Content-Type': 'application/json'},
        'body': JSON.stringify({'content': newContent, 'done': done, 'category': newCategory})
        })
    return await result.json();
}

// Get all categories
export async function getCategories(authToken) {
    const result = await fetch(backend_base+"/categories",{
        'method':'GET',
        'headers': {'Authorization': 'Bearer ' + authToken}
    })
    return await result.json();
}

// Add category
export async function addCategory(authToken, category) {
    const result = await fetch(backend_base+"/categories/",{
        'method':'POST',
        'headers': {'Authorization': 'Bearer ' + authToken,
        'Content-Type': 'application/json'},
        'body': JSON.stringify({'category': category})
    })
    return await result.json();
}

// Delete category
export async function removeCategory(authToken, id) {
    const result = await fetch(backend_base+"/categories/"+id,{
        'method':'DELETE',
        'headers': {'Authorization': 'Bearer ' + authToken}
    })
    return await result.json();
}