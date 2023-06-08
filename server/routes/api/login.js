const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const recaptcha = require('../../middleware/reCaptchaMiddleware');

const authController = require('../../controllers/authentication');

// GET
router.get('/', (req, res) => {
    try { res.send("Login page ") } catch (error) {
        return res.status(500).send({ error: `FSM Error - Login: ${error}` });
    }
});

// removed middleware recaptcha. This is to be replaced with silent captcha.
router.post('/',  [
    check('email', "Email is not in the correct format").isEmail(),
    check('password', "Password must be more than 5 characters").isLength({ min: 5 }),
], authController.login);

module.exports = router;