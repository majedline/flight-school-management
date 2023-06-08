module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            field: 'iduser',
        },
        firstName: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        lastName: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        type: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        active: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        createdOn: {
            type: Sequelize.DATE,
            allowNull: false,
            field: 'createdOn',
            defaultValue: Sequelize.NOW

        },
        editedOn: {
            type: Sequelize.DATE,
            allowNull: false,
            field: 'editedOn',
            defaultValue: Sequelize.NOW

        }

    });
    return User;

}
