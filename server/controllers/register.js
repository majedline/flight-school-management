const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { check, validationResult } = require('express-validator');
const { v4: uuidv4 } = require('uuid');
// const config = require('config');
// const settings = require('../../config/settings');

const db = require('../models');

const register = async (req, res) => {
    console.log("POST Register");

    // validation failed, send and leave
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log("error", errors.array())
        return res.status(400).send({ "error": errors.array() });
    }

    // no errors, get the content of the body
    const { firstName, lastName, email, password, phone, userType, disclaimerSigned } = req.body;

    console.log(firstName, lastName, email, password, phone, userType, disclaimerSigned)

    try {
        console.log(db.user);
        // find the user
        let user = await db.user.findOne({ where: { email } });


        // User already exists, send and leave
        if (user) {
            return res.status(400).send({ error: `FSM Error - Email already used` });
        }

        // creating the user
        const clientRef = uuidv4();
        const hashedPassword = await bcrypt.hash(password, 10);
        const createdOn = new Date();

        const newUser = await db.user.create({
            email,
            firstName: firstName,
            lastName: lastName,
            password: hashedPassword,
            type: userType,
            active: true,
            createdOn,
            editedOn: createdOn
        });

        const id = newUser.id;

        const payload = {
            user: { id, clientRef, firstName, lastName, phone, userType, disclaimerSigned }
        };

        let jwtpass = "welcometoadmcanxy2023";
        let cookieName = "fsmaccesstoken";

        if (process.env.NODE_ENV === "production") {
            jwtpass = process.env.jwtpass;
            cookieName = process.env.cookieName;
        }

        jwt.sign(
            payload,
            jwtpass,
            { expiresIn: 40000 },
            function (err, token) {
                if (err) {
                    throw err;
                } else {
                    res.cookie(cookieName, token, {
                        maxAge: 1 * 60 * 60 * 1000,
                        httpOnly: false,
                        secure: process.env.NODE_ENV === "production",
                    })
                        .status(200)
                        .json({ token, message: "Signed up successfully" });
                }
            });

    } catch (error) {
        return res.status(500).send({ error: `FSM Error - register: ${error}` });
    }
}

module.exports = {
    register
};
