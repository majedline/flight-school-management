module.exports = (sequelize, Sequelize) => {
  const Asset = sequelize.define("asset", {
    idasset: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    type: {
      type: Sequelize.STRING(45),
    },
    callSign: {
      type: Sequelize.STRING(45),
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
