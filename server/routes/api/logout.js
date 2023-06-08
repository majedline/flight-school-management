const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const authController = require('../../controllers/authentication');

// GET
router.get('/', (req, res) => {
    try { res.send("Logout page ") } catch (error) {
        return res.status(500).send({ error: `FSM Error - Login: ${error}` });
    }
});
router.post('/', authController.logout);

module.exports = router;