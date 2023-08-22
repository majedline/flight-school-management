module.exports = (sequelize, Sequelize) => {
    const Flight = sequelize.define("flight", {
        flightID: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        studentID: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        instructorID: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        assetID: {
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
        flightStatus: {
            type: Sequelize.STRING(100),
            defaultValue: "active",
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
        companyID: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        }
    });

    return Flight;
};
