import { Sequelize } from "sequelize";
import 'dotenv/config';
import models from '../models/task.js'; // Import the models

// Sequelize connection
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT
});

// Function to initialize the database and models
const initializeDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');

        // Check if tables exist and sync models to the database
        const [results, metadata] = await sequelize.query("SHOW TABLES;"); // Get existing tables
        const existingTables = results.map(row => Object.values(row)[0]); // Extract table names

        // Sync models to the database
        await sequelize.sync({ alter: true }); // Use { alter: true } to update existing tables
        console.log('Database and tables synchronized');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

// Call the initialize function
initializeDatabase();

export default sequelize; 