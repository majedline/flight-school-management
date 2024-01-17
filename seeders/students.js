'use strict';

const faker = require('faker'); // You may need to install this package

module.exports = {
  async up(queryInterface, Sequelize) {
    const studentsData = [];

    // Generate test students
    for (let i = 0; i < 10; i++) {
      studentsData.push({
        firstName: faker.name.firstName(),
        middleName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        age: faker.random.number({ min: 18, max: 30 }),
        addressLine1: faker.address.streetAddress(),
        addressLine2: faker.address.secondaryAddress(),
        city: faker.address.city(),
        province: faker.address.state(),
        country: faker.address.country(),
        postalCode: faker.address.zipCode(),
        medicalFitness: faker.random.word(),
        languageProficiency: faker.random.word(),
        groundSchool: faker.random.word(),
        flightTraining: faker.random.word(),
        flightTest: faker.random.word(),
        writtenExam: faker.random.word(),
        aeroplaneLicence: faker.random.word(),
        permitType: faker.random.word(),
        active: true,
        createdOn: Sequelize.literal('CURRENT_TIMESTAMP'),
        editedOn: Sequelize.literal('CURRENT_TIMESTAMP'),
        companyID: 1, // Set your company ID here
      });
    }

    // Insert the test students into the 'students' table
    await queryInterface.bulkInsert('students', studentsData, {});

    return Promise.resolve();
  },

  async down(queryInterface, Sequelize) {
    // Remove all test students
    await queryInterface.bulkDelete('students', null, {});
    return Promise.resolve();
  },
};
