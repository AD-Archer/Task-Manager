import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/dbconn.js';

class Tasks extends Model {}

Tasks.init({
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
    }
}, {
    sequelize,
    modelName: 'Tasks'
});

export default Tasks;