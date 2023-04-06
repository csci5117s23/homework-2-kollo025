
/*
* Auto generated Codehooks (c) example
* Install: npm i codehooks-js codehooks-crudlify
*/
import {app} from 'codehooks-js'
import {crudlify} from 'codehooks-crudlify'
import { date, object, string, boolean } from 'yup';

// id ??? bool ???
const todosYup = object({
    content: string().required(),
    done: boolean().required().default(false),
    category: string(),
    created: date().required().default(() => new Date()),
})


app.get("/test", (req, res) => {
    res.json({result: "you did it!"});
});

// Use Crudlify to create a REST API for any collection
crudlify(app, {todos: todosYup})

// bind to serverless runtime
export default app.init();
