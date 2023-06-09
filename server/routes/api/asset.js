const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const assetController = require('../../controllers/asset');

////////////////////////////// GETs ////////////////////////////// 
// GET assets based on search criteria
router.get('/assets', assetController.searchAssets);

// GET all active assets sorted by creation date
router.get('/active-assets', assetController.getActiveAssets);

// GET a asset by ID
router.get('/:id', assetController.getAsset);

////////////////////////////// POSTs ////////////////////////////// 
// POST create a new asset
router.post('/',
  [
    check('name').notEmpty().withMessage('Name is required'),
    check('callSign').notEmpty().withMessage('Call Sign is required'),
    check('type').notEmpty().withMessage('Type is required')
  ],
  assetController.createAsset
);

// POST set a asset to active or inactive
router.post('/:id/active',
  [
    check('active').isBoolean().withMessage('Active status must be a boolean value'),
  ],
  assetController.setAssetActiveStatus
);

// POST edit an existing asset
router.post('/:id',
  [
    check('name').notEmpty().withMessage('Name is required'),
    check('callSign').notEmpty().withMessage('Call Sign is required'),
    check('type').notEmpty().withMessage('Type is required')
  ],
  assetController.editAsset
);



module.exports = router;
