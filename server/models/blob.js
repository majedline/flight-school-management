module.exports = (sequelize, Sequelize) => {
    const Blob = sequelize.define("blob", {
        blobID: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        data: {
            type: Sequelize.BLOB('long'),
            allowNull: false,
        },
        type: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        active: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: true
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
    return Blob;

}
