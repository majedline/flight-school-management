module.exports = (sequelize, Sequelize) => {
    const Flight = sequelize.define("flight", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        studentId: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        instructorId: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        assetId: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        startDate: {
            type: Sequelize.DATE,
            allowNull: false,
        },
        endDate: {
            type: Sequelize.DATE,
            allowNull: false,
        },
        totalTime: {
            type: Sequelize.INTEGER,
            defaultValue: 0,
        },
        active: {
            type: Sequelize.BOOLEAN,
            defaultValue: true,
        },
        createdOn: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
        },
        editedOn: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
        },
    });

    return Flight;
};
