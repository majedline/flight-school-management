const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const flightController = require('../../controllers/flight');

////////////////////////////// GETs ////////////////////////////// 
// GET flights based on search criteria
router.get('/flights', flightController.searchFlights);

// GET all active flights sorted by start date
router.get('/active-flights', flightController.getActiveFlights);

// GET a flight by ID
router.get('/:id', flightController.getFlight);

////////////////////////////// POSTs ////////////////////////////// 
// POST create a new flight
router.post('/',
  [
    check('studentId').notEmpty().withMessage('Student ID is required'),
    check('instructorId').notEmpty().withMessage('Instructor ID is required'),
    check('assetId').notEmpty().withMessage('Asset ID is required'),
    check('startDate').notEmpty().withMessage('Start date is required'),
    check('endDate').notEmpty().withMessage('End date is required'),
  ],
  flightController.createFlight
);

// POST edit an existing flight
router.post('/:id',
  [
    check('studentId').notEmpty().withMessage('Student ID is required'),
    check('instructorId').notEmpty().withMessage('Instructor ID is required'),
    check('assetId').notEmpty().withMessage('Asset ID is required'),
    check('startDate').notEmpty().withMessage('Start date is required'),
    check('endDate').notEmpty().withMessage('End date is required'),
  ],
  flightController.editFlight
);

// POST delete a flight
router.post('/:id/delete', flightController.deleteFlight);

// POST complete a flight
router.post('/:id/complete',
  [
    check('totalTime').isInt({ min: 0 }).withMessage('Total time must be a non-negative integer'),
  ],
  flightController.completeFlight
);

module.exports = router;