const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const recaptcha = require('../../middleware/reCaptchaMiddleware');


const config = require('config');
const { check, validationResult } = require('express-validator');
const { v4: uuidv4 } = require('uuid');

const registerController = require('../../controllers/register');

router.get('/', (req, res) => {
    try { res.send("Register page ") } catch (error) {
        return res.status(500).send({ error: `FSM Error - register: ${error}` });
    }
});

router.post('/',  [
    check('firstName', "First name is required.").not().isEmpty(),
    check('lastName', "Last name is required.").not().isEmpty(),
    check('phone', "Last name is required.").not().isEmpty(),
    check('email', "Email is not in the correct format").isEmail(),
    check('userType', "User type is required").not().isEmpty(),
    check('password', "Password must be more than 5 characters").isLength({ min: 5 }),
], registerController.register);

module.exports = router;

