const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const studentController = require('../../controllers/student');

////////////////////////////// GETs ////////////////////////////// 
// GET students based on search criteria
router.get('/students', studentController.searchStudents);

// GET all active students sorted by creation date
router.get('/active-students', studentController.getActiveStudents);

// GET a student by ID
router.get('/:id', studentController.getStudent);

////////////////////////////// POSTs ////////////////////////////// 
// POST create a new student
router.post('/',
  [
    check('firstName').notEmpty().withMessage('First name is required'),
    check('lastName').notEmpty().withMessage('Last name is required'),
    check('email').isEmail().withMessage('Invalid email'),
    check('age').isInt({ min: 18 }).withMessage('Age must be at least 18'),
  ],
  studentController.createStudent
);

// POST set a student to active or inactive
router.post('/:id/active',
  [
    check('active').isBoolean().withMessage('Active status must be a boolean value'),
  ],
  studentController.setStudentActiveStatus
);

// POST edit an existing student
router.post('/:id',
  [
    check('firstName').notEmpty().withMessage('First name is required'),
    check('lastName').notEmpty().withMessage('Last name is required'),
    check('email').isEmail().withMessage('Invalid email'),
    check('age').isInt({ min: 18 }).withMessage('Age must be at least 18'),
  ],
  studentController.editStudent
);



module.exports = router;
