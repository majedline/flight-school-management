
const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {

    try {
        const { newPassword, confirmPassword } = req.body;
        if (newPassword) {
            if (newPassword.length < 5) {
                return res.status(401).send({
                    error: `Password must be more than 5 character`
                });
            } else {

                if (newPassword !== confirmPassword) {
                    return res.status(401).send({
                        error: `FSM Error -  new password and reentered password are the not the same`
                    });
                } else {
                    // the passwords do not match
                    next();
                }
            }
        } else {
            // the passwords is not being updated, just continue on next
            next();
        }

    } catch (error) {
        return res.status(401).send({ error: `FSM Error - old password, new password, or confirmedPassword invalid ${error}` });

    }

}
