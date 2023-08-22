module.exports = (sequelize, Sequelize) => {
    const Company = sequelize.define("company", {
      companyID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING(100),
      },
      addressLine1: {
        type: Sequelize.STRING(255),
      },
      addressLine2: {
        type: Sequelize.STRING(255),
      },
      city: {
        type: Sequelize.STRING(100),
      },
      province: {
        type: Sequelize.STRING(100),
      },
      country: {
        type: Sequelize.STRING(100),
      },
      postalCode: {
        type: Sequelize.STRING(20),
      },
      phoneNumber: {
        type: Sequelize.STRING(20),
      },
      email: {
        type: Sequelize.STRING(100),
      },
      headerImage: {
        type: Sequelize.BLOB,
      },
      footerImage: {
        type: Sequelize.BLOB,
      },
      logoImage: {
        type: Sequelize.BLOB,
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
  
    return Company;
  };
  