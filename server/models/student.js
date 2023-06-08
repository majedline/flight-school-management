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
    permitType: {
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

  return Student;
};
