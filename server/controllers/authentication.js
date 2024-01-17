const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
// const settings = require("../../config/settings");
// const { getTokenKey } = require('../misc/helper');
const db = require('../models');
const { captureRejectionSymbol } = require('nodemailer/lib/xoauth2');


let jwtpass = "welcometoadmcanxy2023";
let cookieName = "fsmaccesstoken";

if (process.env.NODE_ENV === "production") {
    jwtpass = process.env.jwtpass;
    cookieName = process.env.cookieName;
}


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

        let user = await db.user.findOne({ where: { email } });

        // User does not exist, send and leave
        if (!user) {
            console.log("username '" + email + "' not found in user table", user)
            return res.status(400).send({ error: `FSM Error - Invalid email or password` });
        }

        const matched = await bcrypt.compare(password, user.password);

        // found the email, now compare the username and password
        if (!matched) {
            console.log("password wrong")
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

        console.log("payload", payload);

        console.log("jwt.sign")
        jwt.sign(
            payload,
            jwtpass,
            { expiresIn: 40000 },
            function (err, token) {
                if (err) {
                    throw err;
                } else {
                    console.log("cookie", cookieName, token )
                    console.log("success, setting the cookie ("+cookieName+") now with token on ", (process.env.NODE_ENV === "production" ? "https://edo3.herokuapp.com" : "http://localhost:3000"), token)

                    res.cookie(cookieName, token, {
                        maxAge: 1 * 60 * 60 * 1000,
                        httpOnly: false,
                        secure: process.env.NODE_ENV === "production" ? true : false,
                        sameSite: process.env.NODE_ENV === "production" ? 'none' : 'Lax',
                        path: "/"
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
        res.cookie(cookieName, "logout", {
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
