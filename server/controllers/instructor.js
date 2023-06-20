const db = require('../models');

// Create a instructor
const createInstructor = async (req, res) => {
  try {
    // Extract instructor data from request body
    const {
      firstName,
      middleName,
      lastName,
      email,
      address,
      medicalFitness,
      languageProficiency,
      groundSchool,
      flightTraining,
      flightTest,
      writtenExam,
      aeroplaneLicence,
      permitType,
    } = req.body;

    // Create the instructor in the database
    const newInstructor = await db.instructor.create({
      firstName,
      middleName,
      lastName,
      email,
      addressLine1: ((address) ? address.addressLine1 : null),
      addressLine2: ((address) ? address.addressLine2 : null),
      city: ((address) ? address.city : null),
      province: ((address) ? address.province : null),
      country: ((address) ? address.country : null),
      postalCode: ((address) ? address.postalCode : null),
      medicalFitness,
      languageProficiency,
      groundSchool,
      flightTraining,
      flightTest,
      writtenExam,
      aeroplaneLicence,
      permitType,
      active: true,
    });

    res.status(201).json({ message: 'Instructor created successfully', instructor: newInstructor });
  } catch (error) {
    res.status(500).json({ error: `Failed to create instructor: ${error.message}` });
  }
};

// Edit a instructor
const editInstructor = async (req, res) => {
  try {
    // Extract instructor ID and updated data from request body
    const { id } = req.params;
    const {
      firstName,
      middleName,
      lastName,
      email,
      address,
      medicalFitness,
      languageProficiency,
      groundSchool,
      flightTraining,
      flightTest,
      writtenExam,
      aeroplaneLicence,
      permitType,
    } = req.body;

    // Find the instructor in the database
    const instructor = await db.instructor.findByPk(id);

    if (!instructor) {
      return res.status(404).json({ error: 'Instructor not found' });
    }

    // Update the instructor's data
    instructor.firstName = firstName;
    instructor.middleName = middleName;
    instructor.lastName = lastName;
    instructor.email = email;
    instructor.addressLine1 = ((address) ? address.addressLine1 : null);
    instructor.addressLine2 = ((address) ? address.addressLine2 : null);
    instructor.city = ((address) ? address.city : null);
    instructor.province = ((address) ? address.province : null);
    instructor.country = ((address) ? address.country : null);
    instructor.postalCode = ((address) ? address.postalCode : null);
    instructor.medicalFitness = medicalFitness;
    instructor.languageProficiency = languageProficiency;
    instructor.groundSchool = groundSchool;
    instructor.flightTraining = flightTraining;
    instructor.flightTest = flightTest;
    instructor.writtenExam = writtenExam;
    instructor.aeroplaneLicence = aeroplaneLicence;
    instructor.permitType = permitType;

    // Save the updated instructor in the database
    await instructor.save();

    res.json({ message: 'Instructor updated successfully', instructor });
  } catch (error) {
    res.status(500).json({ error: `Failed to edit instructor: ${error.message}` });
  }
};

// Set a instructor to active or inactive
const setInstructorActiveStatus = async (req, res) => {
  try {
    // Extract instructor ID and active status from request body
    const { id } = req.params;
    const { active } = req.body;

    // Find the instructor in the database
    const instructor = await db.instructor.findByPk(id);

    if (!instructor) {
      return res.status(404).json({ error: 'Instructor not found' });
    }

    // Update the instructor's active status
    instructor.active = active;

    // Save the updated instructor in the database
    await instructor.save();

    res.json({ message: `Instructor set to ${active ? 'active' : 'inactive'} successfully`, instructor });
  } catch (error) {
    res.status(500).json({ error: `Failed to set instructor active status: ${error.message}` });
  }
};


// Get a instructor by ID
const getInstructor = async (req, res) => {
  try {
    // Extract instructor ID from request parameters
    const { id } = req.params;

    // Find the instructor in the database
    const instructor = await db.instructor.findByPk(id);

    if (!instructor) {
      return res.status(404).json({ error: 'Instructor not found' });
    }

    res.json({ instructor });
  } catch (error) {
    res.status(500).json({ error: `Failed to get instructor: ${error.message}` });
  }
};

// Search instructors by name, email, and active status
const searchInstructors = async (req, res) => {
  try {
    // Extract search parameters from request query
    const { name, email, active } = req.query;

    // Prepare search conditions
    const searchConditions = {
      where: {},
    };

    if (name) {
      searchConditions.where.firstName = { [db.Sequelize.Op.like]: `%${name}%` };
    }

    if (email) {
      searchConditions.where.email = { [db.Sequelize.Op.like]: `%${email}%` };
    }

    if (active !== undefined) {
      searchConditions.where.active = active === 'true';
    }

    // Search instructors in the database
    const instructors = await db.instructor.findAll(searchConditions);

    res.json({ instructors });
  } catch (error) {
    res.status(500).json({ error: `Failed to search instructors: ${error.message}` });
  }
};

// Get all active instructors sorted by created date
const getActiveInstructors = async (req, res) => {
  try {
    // Find active instructors in the database
    const instructors = await db.instructor.findAll({
      where: { active: true },
      order: [['createdAt', 'DESC']],
    });

    res.json({ instructors });
  } catch (error) {
    res.status(500).json({ error: `Failed to get active instructors: ${error.message}` });
  }
};


module.exports = {
  createInstructor,
  editInstructor,
  setInstructorActiveStatus,
  getInstructor,
  searchInstructors,
  getActiveInstructors
};
