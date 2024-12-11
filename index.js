// index.js

//imports
import express from "express";
import 'dotenv/config';
import sequelize from "./config/dbconn.js";
import taskRoutes from "./routes/tasks.js"
import './models/testData.js';

// variables
const app = express();
const port = '3000';
const url = "localhost"



// app.use
app.use(express.json());

app.use('/tasks', taskRoutes)


// routes using express
// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });



 app.listen(port, () => {
    console.log(`Server is running on http://${url}:${port}`);
    console.log() // blank log to make console out more readable
});

