import { Sequelize } from "sequelize";
import 'dotenv/config';

// add sequlize connection

// Sequelize

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, { // database, username, password
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT
  });
  
  // authentication to ensure connection
  try {
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  
export default sequelize; 