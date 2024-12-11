// index.js

//imports
import express from "express";
import 'dotenv/config';
import taskRoutes from "./routes/tasks.js"
import './models/testData.js';

// variables
const app = express();
const port = '3000';
const url = "localhost"


// app.use
app.use(express.json());
app.use('/tasks', taskRoutes)



/*
// app.use(express.static('public')); 

//tell express where to find our template files
// app.use('view engine', 'ejs')
// app.use("views", "./views")

//tell express where to find our public files
// app.use(express.static(join(process.cwd(), 'public')));



// Start our server
const startServer = async () => {
    try {
        await app.listen(3000);
        console.log(`Website running at http://${url}:${port}`);
    } catch (error) {
        console.log('Oops! Server start failed:', error);
    }
};

startServer();

*/

 app.listen(port, () => {
    console.log(`Server is running on http://${url}:${port}`);
    console.log() // blank log to make console out more readable
});

