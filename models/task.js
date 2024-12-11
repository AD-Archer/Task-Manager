import { Sequelize } from "sequelize";

export default (Sequelize, Datatypes) => {
    const Task = sequelize.define('Task', {
        title: {
            type: Datatypes.STRING,
            allowNull: false,
        },
        completed: {
            type: Datatypes.BOOLEAN,
            defaultValue: false,
        },
    });

    return Task;
}