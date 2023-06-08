const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const settings = require("../../config/settings");
const { getTokenKey } = require('../misc/helper');
const db = require('../models');
const { captureRejectionSymbol } = require('nodemailer/lib/xoauth2');

const login = async (req, res) => {
    console.log("POST login");

    // validation failed, send and leave
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send({ error: errors.array() });
    }

    // no errors, get the content of the body
    const { email, password } = req.body;

    try {
        // find the user
        const user = await db.user.findOne({ where: { email } });

        // User does not exist, send and leave
        if (!user) {
            return res.status(400).send({ error: `FSM Error - Invalid email or password` });
        }

        const matched = await bcrypt.compare(password, user.password);

        // found the email, now compare the username and password
        if (!matched) {
            return res.status(400).send({ error: `FSM Error - Invalid email or password` });
        }

        const payload = {
            user: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                type: user.type
            }
        };
        
        console.log(payload);

        jwt.sign(
            payload,
            getTokenKey(),
            { expiresIn: 40000 },
            function (err, token) {
                if (err) {
                    throw err;
                } else {
                    res.cookie(settings.cookieName, token, {
                        maxAge: 1 * 60 * 60 * 1000,
                        httpOnly: false,
                        secure: process.env.NODE_ENV === "production",
                    })
                        .status(200)
                        .json({ token, user: payload.user, message: "Signed in successfully" })
                }
            });

    } catch (error) {
        return res.status(500).send({ error: `FSM Error - login: ${error}` });
    }
}

const logout = async (req, res) => {
    console.log("POST logout");

    try {
        res.cookie(settings.cookieName, "logout", {
            maxAge: 0,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
        })
            .status(200)
            .json({ message: "Signed out successfully" })
    } catch (error) {
        return res.status(500).send({ error: `FSM Error - logout: ${error}` });
    }
}

module.exports = {
    login, logout
};
