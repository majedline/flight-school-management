const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const flightController = require('../../controllers/flight');

////////////////////////////// GETs ////////////////////////////// 
// GET all active flights sorted by start date
router.get('/active-flights', flightController.getActiveFlights);

// GET flights based on search criteria
// router.get('/flights', flightController.searchFlights);


// // GET a flight by ID
// router.get('/:flightID', flightController.getFlight);

////////////////////////////// POSTs ////////////////////////////// 

// POST create a new flight
router.post('/',
  [
    check('studentID').notEmpty().withMessage('Student ID is required'),
    check('instructorID').notEmpty().withMessage('Instructor ID is required'),
    check('assetID').notEmpty().withMessage('Asset ID is required'),
    check('startDate').notEmpty().withMessage('Start date is required'),
    check('endDate').notEmpty().withMessage('End date is required'),
  ],
  flightController.createFlight
);

router.post('/:flightID/complete',
  [
    check('studentID').notEmpty().withMessage('Student ID is required'),
    check('instructorID').notEmpty().withMessage('Instructor ID is required'),
    check('assetID').notEmpty().withMessage('Asset ID is required'),
    check('startDate').notEmpty().withMessage('Start date is required'),
    check('endDate').notEmpty().withMessage('End date is required'),
  ],
  flightController.completeFlight
);

router.post('/:flightID/cancel',
  [
    check('studentID').notEmpty().withMessage('Student ID is required'),
    check('instructorID').notEmpty().withMessage('Instructor ID is required'),
    check('assetID').notEmpty().withMessage('Asset ID is required'),
    check('startDate').notEmpty().withMessage('Start date is required'),
    check('endDate').notEmpty().withMessage('End date is required'),
  ],
  flightController.completeFlight
);

// update a flight
router.post('/:flightID',
  [
    check('studentID').notEmpty().withMessage('Student ID is required'),
    check('instructorID').notEmpty().withMessage('Instructor ID is required'),
    check('assetID').notEmpty().withMessage('Asset ID is required'),
    check('startDate').notEmpty().withMessage('Start date is required'),
    check('endDate').notEmpty().withMessage('End date is required'),
  ],
  flightController.editFlight
);


router.delete('/:flightID',
  flightController.deleteFlight
);



module.exports = router;
