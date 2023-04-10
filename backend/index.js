
/*
* Auto generated Codehooks (c) example
* Install: npm i codehooks-js codehooks-crudlify
*/
import {app} from 'codehooks-js'
import {crudlify} from 'codehooks-crudlify'
import { date, object, string, boolean } from 'yup';


// Reference: https://www.npmjs.com/package/codehooks-crudlify


// ADD USER_ID ???
const todosYup = object({
    content: string().required(),
    done: boolean().required().default(false),
    // user: string().required().default(false),
    category: string(),
    createdOn: date().required().default(() => new Date()),
})

// ADD USER_ID ???
const categoriesYup = object({
    category: string().required(),
    // user: string().required().default(false),
})


// app.get("/todos", (req, res) => {
    // route: /dev/todos --> get all todos

// app.get("/todos/:id", (req, res) => {
    // route: /dev/todos/id --> get todo with specific id

// app.post("/todos", (req, res) => {
    // route: /dev/todos --> add a todo to todos

// app.patch("/todos/:id", (req, res) => {
    // route: /dev/todos/id --> update todo with specific id ???

// Use Crudlify to create a REST API for any collection
crudlify(app, {todos: todosYup, categories: categoriesYup})

// bind to serverless runtime
export default app.init();
