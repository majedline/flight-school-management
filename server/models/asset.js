module.exports = (sequelize, Sequelize) => {
  const Asset = sequelize.define("asset", {
    idasset: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING(45),
    },
    type: {
      type: Sequelize.STRING(45),
    },
    callSign: {
      type: Sequelize.STRING(45),
    },
    registrationNumber: {
      type: Sequelize.STRING(100),
    },
    flightSchoolDesignation: {
      type: Sequelize.STRING(100),
    },
    flightSchoolAerodrome: {
      type: Sequelize.STRING(100),
    },
    createdOn: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    },
    editedOn: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW

    },
  });

  return Asset;
};
