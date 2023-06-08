const { check, validationResult } = require('express-validator');
const { toDateTime } = require('../misc/helper');
const bcrypt = require('bcryptjs');
const { User } = require('../models');

const getAccountByID = async (req, res) => {
    console.log("GET account by userid");
    try {
        const userId = req.user.id;
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).send({ error: "User not found" });
        }

        let account = {
            "userid": user.id,
            "clientRef": user.clientRef,
            "firstName": user.firstName,
            "aliasName": user.aliasName,
            "lastName": user.lastName,
            "phone": user.phone,
            "email": user.email,
            "profilePicture": user.profilePicture,
            "createdOn": toDateTime(user.createdOn.getTime() / 1000)
        };

        if (user.updatedOn) {
            account["updatedOn"] = toDateTime(user.updatedOn.getTime() / 1000);
        }
        if (user.passwordUpdatedOn) {
            account["passwordUpdatedOn"] = toDateTime(user.passwordUpdatedOn.getTime() / 1000);
        }

        res.send(account);

    } catch (error) {
        return res.status(500).send({ error: `FSM Error - account: ${error}` });
    }
}

const updateAccountByID = async (req, res) => {
    console.log("POST update account");
    try {
        // validation failed, send and leave
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send({ error: errors.array() });
        }

        const { firstName, aliasName, lastName, email, newPassword, phone, profilePicture } = req.body;
        const userId = req.user.id;

        const payload = {
            "firstName": firstName,
            "aliasName": aliasName,
            "lastName": lastName,
            "email": email,
            "phone": phone,
            "profilePicture": profilePicture
        };

        // check if the user has the correct email and password
        const allowedToUpdate = await isEmailAndPasswordValid(req, res);

        if (allowedToUpdate) {
            const user = await User.findByPk(userId);

            if (!user) {
                return res.status(404).send({ error: "User not found" });
            }

            const updatedOn = new Date();
            if (newPassword) {
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(newPassword, salt);
                payload["password"] = hashedPassword;
                payload["passwordUpdatedOn"] = updatedOn;
            }

            payload["updatedOn"] = updatedOn;
            await user.update(payload);

            res.send({ "msg": "successfully updated account", "updatedOn": toDateTime(updatedOn.getTime() / 1000) });
        } else {
            return res.status(400).send({ error: `FSM Error - account cannot be updated, check your current password again` });
        }

    } catch (error) {
        return res.status(500).send({ error: `FSM Error - inspect: ${error}` });
    }
}

/********************** Helpers *****************************/
const isEmailAndPasswordValid = async (req, res) => {
    const { currentPassword } = req.body;
    const userId = req.user.id;

    const user = await User.findByPk(userId);
    if (!user) {
        return false;
    }

    const matched = await bcrypt.compare(currentPassword, user.password);
    return matched;
}

module.exports = {
    getAccountByID,
    updateAccountByID
};
