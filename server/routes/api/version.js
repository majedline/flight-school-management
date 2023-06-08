const express = require('express');
const router = express.Router();
const versionController = require('../../controllers/version');
const authMiddleware = require('../../middleware/authMiddleware');


router.get('/', versionController.version);

module.exports = router;
