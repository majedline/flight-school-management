const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const instructorController = require('../../controllers/instructor');

////////////////////////////// GETs ////////////////////////////// 
// GET instructors based on search criteria
router.get('/instructors', instructorController.searchInstructors);

// GET all active instructors sorted by creation date
router.get('/active-instructors', instructorController.getActiveInstructors);

// GET a instructor by ID
router.get('/:id', instructorController.getInstructor);

////////////////////////////// POSTs ////////////////////////////// 
// POST create a new instructor
router.post('/',
  [
    check('firstName').notEmpty().withMessage('First name is required'),
    check('lastName').notEmpty().withMessage('Last name is required'),
    check('email').isEmail().withMessage('Invalid email'),
    check('age').isInt({ min: 18 }).withMessage('Age must be at least 18'),
  ],
  instructorController.createInstructor
);

// POST set a instructor to active or inactive
router.post('/:id/active',
  [
    check('active').isBoolean().withMessage('Active status must be a boolean value'),
  ],
  instructorController.setInstructorActiveStatus
);

// POST edit an existing instructor
router.post('/:id',
  [
    check('firstName').notEmpty().withMessage('First name is required'),
    check('lastName').notEmpty().withMessage('Last name is required'),
    check('email').isEmail().withMessage('Invalid email'),
    check('age').isInt({ min: 18 }).withMessage('Age must be at least 18'),
  ],
  instructorController.editInstructor
);



module.exports = router;
