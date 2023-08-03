const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const companyController = require('../../controllers/company');

////////////////////////////// GETs ////////////////////////////// 
// GET companies based on search criteria
router.get('/companies', companyController.searchCompanies);

// GET all active companies sorted by creation date
router.get('/active-companies', companyController.getActiveCompanies);

// GET a company by ID
router.get('/:id', companyController.getCompany);

////////////////////////////// POSTs ////////////////////////////// 
// POST create a new company
router.post('/',
  [
    check('name').notEmpty().withMessage('Name is required'),
    check('addressLine1').notEmpty().withMessage('Address Line 1 is required'),
    check('city').notEmpty().withMessage('City is required'),
    check('province').notEmpty().withMessage('Province is required'),
    check('country').notEmpty().withMessage('Country is required'),
    check('postalCode').notEmpty().withMessage('Postal Code is required'),
    check('phoneNumber').notEmpty().withMessage('Phone Number is required'),
    check('email').notEmpty().withMessage('Email is required'),
  ],
  companyController.createCompany
);

// POST set a company to active or inactive
router.post('/:id/active',
  [
    check('active').isBoolean().withMessage('Active status must be a boolean value'),
  ],
  companyController.setCompanyActiveStatus
);

// POST edit an existing company
router.post('/:id',
  [
    check('name').notEmpty().withMessage('Name is required'),
    check('addressLine1').notEmpty().withMessage('Address Line 1 is required'),
    check('city').notEmpty().withMessage('City is required'),
    check('province').notEmpty().withMessage('Province is required'),
    check('country').notEmpty().withMessage('Country is required'),
    check('postalCode').notEmpty().withMessage('Postal Code is required'),
    check('phoneNumber').notEmpty().withMessage('Phone Number is required'),
    check('email').notEmpty().withMessage('Email is required'),
  ],
  companyController.editCompany
);

module.exports = router;
