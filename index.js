// index.js

//imports
import express from "express";
import 'dotenv/config';
import taskRoutes from "./routes/tasks.js"
import './models/testData.js';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from "url";
import { createSecretKey } from "crypto";
import session from "express-session";

// variables
const app = express();
const port = '2555';
const url = "localhost"

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url); // Get the current file path
const __dirname = path.dirname(__filename); // Get the directory name


app.use(cookieParser())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie:{
        secure: process.env.NODE_ENV === 'production',
        maxAge: 24 * 60 * 600 * 1000 //24 hours

    }}))

app.use(session( { cookie: {}}))

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views/pages')); // Set the views directory


// app.use
app.use(express.json());
app.use(express.urlencoded({extended: true})); 

app.use(express.static('public')); // Serve static files from public
app.use('/api', taskRoutes)
app.use('/', taskRoutes)



// Start our server
 app.listen(port, () => { // port is passed here
    console.log(`Server is running on http://${url}:${port}`);
    console.log() // blank log to make console out more readable
});

