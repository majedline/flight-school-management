const db = require('../models');

// Create a student
const createStudent = async (req, res) => {
  try {
    // Extract student data from request body
    const {
      firstName,
      middleName,
      lastName,
      age,
      email,
      // address,
      addressLine1,
      addressLine2,
      city,
      province,
      country,
      postalCode,
      medicalFitness,
      languageProficiency,
      groundSchool,
      flightTraining,
      flightTest,
      writtenExam,
      aeroplaneLicence,
      permitType,
    } = req.body;

    // Create the student in the database
    const newStudent = await db.student.create({
      firstName,
      middleName,
      lastName,
      email,
      age,
      addressLine1,
      addressLine2,
      city,
      province,
      country,
      postalCode,
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

    res.status(201).json({ message: 'Student created successfully', student: newStudent });
  } catch (error) {
    res.status(500).json({ error: `Failed to create student: ${error.message}` });
  }
};

// Edit a student
const editStudent = async (req, res) => {
  try {
    // Extract student ID and updated data from request body
    const { id } = req.params;
    const {
      firstName,
      middleName,
      lastName,
      age,
      email,
      addressLine1,
      addressLine2,
      city,
      province,
      country,
      postalCode,
      medicalFitness,
      languageProficiency,
      groundSchool,
      flightTraining,
      flightTest,
      writtenExam,
      aeroplaneLicence,
      permitType,
    } = req.body;

    // Find the student in the database
    const student = await db.student.findByPk(id);

    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    // Update the student's data
    student.firstName = firstName;
    student.middleName = middleName;
    student.lastName = lastName;
    student.email = email;
    student.age = age;
    student.addressLine1 = addressLine1;
    student.addressLine2 = addressLine2;
    student.city = city;
    student.province = province;
    student.country = country
    student.postalCode = postalCode;
    student.medicalFitness = medicalFitness;
    student.languageProficiency = languageProficiency;
    student.groundSchool = groundSchool;
    student.flightTraining = flightTraining;
    student.flightTest = flightTest;
    student.writtenExam = writtenExam;
    student.aeroplaneLicence = aeroplaneLicence;
    student.permitType = permitType;

    // Save the updated student in the database
    await student.save();

    res.json({ message: 'Student updated successfully', student });
  } catch (error) {
    res.status(500).json({ error: `Failed to edit student: ${error.message}` });
  }
};

// Set a student to active or inactive
const setStudentActiveStatus = async (req, res) => {
  try {
    // Extract student ID and active status from request body
    const { id } = req.params;
    const { active } = req.body;

    // Find the student in the database
    const student = await db.student.findByPk(id);

    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    // Update the student's active status
    student.active = active;

    // Save the updated student in the database
    await student.save();

    res.json({ message: `Student set to ${active ? 'active' : 'inactive'} successfully`, student });
  } catch (error) {
    res.status(500).json({ error: `Failed to set student active status: ${error.message}` });
  }
};


// Get a student by ID
const getStudent = async (req, res) => {
  try {
    // Extract student ID from request parameters
    const { id } = req.params;

    // Find the student in the database
    const student = await db.student.findByPk(id);

    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    res.json({ student });
  } catch (error) {
    res.status(500).json({ error: `Failed to get student: ${error.message}` });
  }
};

// Search students by name, email, and active status
const searchStudents = async (req, res) => {
  try {
    // Extract search parameters from request query
    const { firstName, lastName, email, active } = req.query;

    // Prepare search conditions
    const searchConditions = {
      where: {},
    };

    if (firstName) {
      searchConditions.where.firstName = { [db.Sequelize.Op.like]: `%${firstName}%` };
    }

    if (lastName) {
      searchConditions.where.lastName = { [db.Sequelize.Op.like]: `%${lastName}%` };
    }

    if (email) {
      searchConditions.where.email = { [db.Sequelize.Op.like]: `%${email}%` };
    }

    if (active !== undefined) {
      searchConditions.where.active = active === 'true';
    }

    // Search students in the database
    const students = await db.student.findAll(searchConditions);

    res.json({ students });
  } catch (error) {
    res.status(500).json({ error: `Failed to search students: ${error.message}` });
  }
};

// Get all active students sorted by created date
const getActiveStudents = async (req, res) => {
  try {
    // Find active students in the database
    const students = await db.student.findAll({
      where: { active: true },
      order: [['createdAt', 'DESC']],
    });

    res.json({ students });
  } catch (error) {
    res.status(500).json({ error: `Failed to get active students: ${error.message}` });
  }
};

const quickSearchStudents = async (req, res) => {
  const { name } = req.query;
  const [firstName, lastName] = name.split(' ');

  try {
    let students;
    if (firstName && lastName) {
      // Search for firstName in the firstName field and lastName in the lastName field
      students = await db.student.findAll({
        firstName: { $regex: firstName, $options: 'i' },
        lastName: { $regex: lastName, $options: 'i' },
      });
    } else {
      // Search for name in the firstName or lastName field
      students = await db.student.findAll({
        $or: [
          { firstName: { $regex: name, $options: 'i' } },
          { lastName: { $regex: name, $options: 'i' } },
        ],
      });
    }

    students = students.slice(0, 25); // Limit the search to top 25 results
    res.json(students);
  } catch (error) {
    console.error('Error searching students:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};





module.exports = {
  createStudent,
  editStudent,
  setStudentActiveStatus,
  getStudent,
  searchStudents,
  getActiveStudents,
  quickSearchStudents
};
