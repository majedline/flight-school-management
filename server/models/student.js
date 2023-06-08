module.exports = (sequelize, Sequelize) => {
  const Student = sequelize.define("student", {
    idStudent: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: Sequelize.STRING(45),
    },
    lastName: {
      type: Sequelize.STRING(45),
    },
    email: {
      type: Sequelize.STRING(45),
    },
    age: {
      type: Sequelize.STRING(45),
    },
    addressLine1: {
      type: Sequelize.STRING(100),
    },
    addressLine2: {
      type: Sequelize.STRING(100),
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
    medicalFitness: {
      type: Sequelize.STRING(100),
    },
    languageProficiency: {
      type: Sequelize.STRING(100),
    },
    groundSchool: {
      type: Sequelize.STRING(100),
    },
    flightTraining: {
      type: Sequelize.STRING(100),
    },
    flightTest: {
      type: Sequelize.STRING(100),
    },
    writtenExam: {
      type: Sequelize.STRING(100),
    },
    aeroplaneLicence: {
      type: Sequelize.STRING(100),
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

  return Student;
};
