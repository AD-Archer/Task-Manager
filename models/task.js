import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/dbconn.js';

class User extends Model { }
User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true, // Sequelize will create the unique index automatically
            validate: {
                isEmail: true,
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        balance: {
            type: DataTypes.DECIMAL(10, 2),
            defaultValue: 0.0,
        },
    },
    {
        sequelize,
        modelName: 'User',
        tableName: 'users',
        timestamps: true,
    }
);
// Define Tasks model
class Tasks extends Model { }
Tasks.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
        },
        completed: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    },
    {
        sequelize,
        modelName: 'Tasks',
        tableName: 'tasks', // Explicit table name
        timestamps: true, // Adds createdAt and updatedAt columns
    }
);

// Define relationships
User.hasMany(Tasks, {
    foreignKey: 'userId', // Establish foreign key in Tasks table
    onDelete: 'CASCADE', // Ensures child tasks are deleted if user is removed
});
Tasks.belongsTo(User, {
    foreignKey: 'userId',
});

// Export the models
export default { User, Tasks };