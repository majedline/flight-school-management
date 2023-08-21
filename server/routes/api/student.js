const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const studentController = require('../../controllers/student');
const authMiddleware = require('../../middleware/authMiddleware');

////////////////////////////// GETs ////////////////////////////// 
// GET students based on search criteria
router.get('/students', authMiddleware, studentController.searchStudents);

// GET all active students sorted by creation date
router.get('/active-students', authMiddleware, studentController.getActiveStudents);

router.get('/quick-search', authMiddleware, studentController.quickSearchStudents);

// GET a student by ID
router.get('/:id', authMiddleware, studentController.getStudent);

////////////////////////////// POSTs ////////////////////////////// 
// POST create a new student
router.post('/',
  [
    check('firstName').notEmpty().withMessage('First name is required'),
    check('lastName').notEmpty().withMessage('Last name is required'),
    check('email').isEmail().withMessage('Invalid email'),
    check('age').isInt({ min: 18 }).withMessage('Age must be at least 18'),
  ], authMiddleware,
  studentController.createStudent
);

// POST set a student to active or inactive
router.post('/:id/active',
  [
    check('active').isBoolean().withMessage('Active status must be a boolean value'),
  ], authMiddleware, 
  studentController.setStudentActiveStatus
);

// POST edit an existing student
router.post('/:id',
  [
    check('firstName').notEmpty().withMessage('First name is required'),
    check('lastName').notEmpty().withMessage('Last name is required'),
    check('email').isEmail().withMessage('Invalid email'),
    check('age').isInt({ min: 18 }).withMessage('Age must be at least 18'),
  ], authMiddleware, 
  studentController.editStudent
);



module.exports = router;
