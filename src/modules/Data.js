const backend_base = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

// ?done=false&sort=createdOn"

// WRONG SORTING ORDER ???
export async function getTodos(authToken, done) {
    const result = await fetch(backend_base+"/todos?sort=createdOn&done="+done,{
        'method':'GET',
        'headers': {'Authorization': 'Bearer ' + authToken}
    })
    return await result.json();
}

export async function getTodo(authToken, id) {
    const result = await fetch(backend_base+"/todos/"+id,{
        'method':'GET',
        'headers': {'Authorization': 'Bearer ' + authToken}
    })
    return await result.json();
}

export async function addTodo(authToken, content) {
    const result = await fetch(backend_base+"/todos/",{
        'method':'POST',
        'headers': {'Authorization': 'Bearer ' + authToken,
        'Content-Type': 'application/json'},
        'body': JSON.stringify({'content': content})
        })
    return await result.json();
}


// PATCH or POST ???
export async function updateTodoStatus(authToken, id, done) {
    const result = await fetch(backend_base+"/todos/"+id,{
        'method':'PATCH',
        'headers': {'Authorization': 'Bearer ' + authToken,
        'Content-Type': 'application/json'},
        'body': JSON.stringify({'done': done})
        })
    return await result.json();
}

// PATCH or POST ???
export async function updateTodoContent(authToken, id, newContent) {
    const result = await fetch(backend_base+"/todos/"+id,{
        'method':'PATCH',
        'headers': {'Authorization': 'Bearer ' + authToken,
        'Content-Type': 'application/json'},
        'body': JSON.stringify({'content': newContent})
        })
    return await result.json();
}

export async function getCategories(authToken) {
    const result = await fetch(backend_base+"/categories",{
        'method':'GET',
        'headers': {'Authorization': 'Bearer ' + authToken}
    })
    return await result.json();
}

export async function addCategory(authToken, category) {
    const result = await fetch(backend_base+"/categories/",{
        'method':'POST',
        'headers': {'Authorization': 'Bearer ' + authToken,
        'Content-Type': 'application/json'},
        'body': JSON.stringify({'category': category})
    })
    return await result.json();
}

// export async function deleteGroup(authToken, group) {
//     const result = await fetch(backend_base+"/groups/"+group._id,{
//         'method':'DELETE',
//         'headers': {'Authorization': 'Bearer ' + authToken},
//     })
//     return await result.json();
// }

// export async function getReview(authToken, group) {
    
//     const result = await fetch(backend_base+"/pres?" + new URLSearchParams({group}), {
//         'method':'GET',
//         'headers': {'Authorization': 'Bearer ' + authToken}
//     })
//     if (result.ok) {
//         const reviews =  await result.json();
//         if (reviews.length >0) {
//             return reviews[0]
//         } else {
//             return null
//         }
//     } else {
//         return null;
//     }
// }



// export async function updateReview(authToken, review) {
//     const result = await fetch(backend_base+"/pres/"+review._id, {
//         'method':'PUT',
//         'headers': {'Authorization': 'Bearer ' + authToken,
//         'Content-Type': 'application/json'},
//         'body': JSON.stringify(review)
//     });
//     return await result.json();
// }