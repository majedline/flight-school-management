const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middleware/authMiddleware');
const updatePasswordCheckMiddlware = require('../../middleware/updatePasswordCheckMiddleware');
const { check } = require('express-validator');


const accountController = require('../../controllers/account');

router.get('/', authMiddleware, accountController.getAccountByID);

router.post('/', authMiddleware, updatePasswordCheckMiddlware, [
    check('firstName', "First name is required.").not().isEmpty(),
    check('lastName', "Last name is required.").not().isEmpty(),
    check('aliasName', "Alias is required. ").not().isEmpty(),
    check('email', "Email is not in the correct format").isEmail(),
    check('currentPassword', "Current Password is required.").not().isEmpty(),
], accountController.updateAccountByID);

module.exports = router;

