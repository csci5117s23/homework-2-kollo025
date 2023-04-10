export default function AddTodoItem({item}){ 
  let myContent = "";

  const API_ENDPOINT = "https://backend-ahul.api.codehooks.io/dev/todos"
  const API_KEY = "e54ecd9c-02c3-481f-a9ca-de4d5d6ecaa7"
  
  function handleSubmit(e) {
    e.preventDefault();
    myContent = e.target.newItem.value;
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
    }
    catch(err){
      console.log("Error: ", err);
    }
  }

  return<>
    <h1>Add a New Todo Item</h1>
    <form method="post" onSubmit={handleSubmit}>
        <input name="newItem" defaultValue="To-do Content" />
        <button type="submit">Add</button>
    </form>
  </>
}