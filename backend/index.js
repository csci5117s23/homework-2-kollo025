 
/*
* Auto generated Codehooks (c) example
* Install: npm i codehooks-js codehooks-crudlify
*/
import {app, Datastore} from 'codehooks-js'
import {crudlify} from 'codehooks-crudlify'
import { date, object, string, boolean } from 'yup';
import jwtDecode from 'jwt-decode';

const todosYup = object({
    userId: string().required(),
    content: string().required(),
    category: string(),
    done: boolean().required().default(false),
    createdOn: date().required().default(() => new Date()),
})

const categoriesYup = object({
    userId: string().required(),
    category: string().required(),
})

// Kluver Code
const userAuth = async (req, res, next) => {
    try {
      const { authorization } = req.headers;
      if (authorization) {
        const token = authorization.replace('Bearer ','');
        const token_parsed = jwtDecode(token);
        req.user_token = token_parsed;
      }
      next();
    } catch (error) {
      next(error);
    } 
  }
app.use(userAuth)

app.use('/todos', (req, res, next) => {
    if (req.method === "POST" || req.method === "PATCH") {
        req.body.userId = req.user_token.sub
    } else if (req.method === "GET") {
        req.query.userId = req.user_token.sub
    }
    next();
})

app.use('/categories', (req, res, next) => {
    if (req.method === "POST" || req.method === "PATCH") {
        req.body.userId = req.user_token.sub
    } else if (req.method === "GET") {
        req.query.userId = req.user_token.sub
    }
    next();
})

app.use('/todos/:id', async (req, res, next) => {
    const id = req.params.ID;
    const userId = req.user_token.sub
    // Check access rights for the document being read/updated/replaced/deleted
    const conn = await Datastore.open();
    try {
        console.log(id);
        const doc = await conn.getOne('todos', id)
        if (doc.userId != userId) {
            // Authenticated user doesn't own this document
            res.status(403).end(); // quit this request
            return
        }
    } catch (e) {
        console.log(e);
        // Document doesn't exist
        res.status(404).end(e);
        return;
    }
    next();
})

// app.use('/todos/:category', async (req, res, next) => {
//     const id = req.params.ID;
//     const userId = req.user_token.sub
//     console.log("here")
//     // Check access rights for the document being read/updated/replaced/deleted
//     const conn = await Datastore.open();
//     try {
//         console.log(id);
//         const doc = await conn.getOne('todos', id)
//         if (doc.userId != userId) {
//             // Authenticated user doesn't own this document
//             res.status(403).end(); // quit this request
//             return
//         }
//     } catch (e) {
//         console.log(e);
//         // Document doesn't exist
//         res.status(404).end(e);
//         return;
//     }
//     next();
// })

// Use Crudlify to create a REST API for any collection
crudlify(app, {todos: todosYup, categories: categoriesYup})

// bind to serverless runtime
export default app.init();
