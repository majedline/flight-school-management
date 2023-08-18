const express = require('express');
const router = express.Router({ mergeParams: true });
const versionController = require('../../controllers/version');
const authMiddleware = require('../../middleware/authMiddleware');
const { companyPath } = require('../../misc/helper');


router.get('/', versionController.version);

module.exports = router;
