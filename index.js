// index.js

//imports
import express from "express";
import 'dotenv/config';
import { Sequelize } from "sequelize";
const tasksRoutes = import('./routes/tasks');
import mysql from 'mysql2'

// variables
const app = express();
const port = process.env.PORT || 3000;
const url = "localhost"

// Sequelize

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, { // database, username, password
  host: 'localhost',
  dialect: "mysql"
});

// authentication to ensure connection
try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

  
// app.use
app.use(express.json());
app.use('tasks', tasksRoutes)



// routes using express
app.get('/', (req, res) => {
    res.send('Hello World!');
});


 app.listen(port, () => {
    console.log(`Server is running on http://${url}:${port}`);
});