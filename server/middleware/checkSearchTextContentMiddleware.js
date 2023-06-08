
module.exports = function (req, res, next) {
    try {
        const { searchTerm } = req.body;
        if (searchTerm) {
            let isValid = true;

            if (searchTerm.length > 50) {
                isValid = false;
                return res.status(401).send({ error: `Search terms cannot be more than 50 characters` });
            }

            if (searchTerm.length < 3) {
                isValid = false;
                return res.status(401).send({ error: `Search terms cannot be less than 3 characters` });
            }

            if (isValid) {
                next();
            }

        } else {
            return res.status(401).send({ error: `Search terms cannot be empty` });
        }

    } catch (error) {
        return res.status(401).send({ error: `FSM Error - old password, new password, or confirmedPassword invalid ${error}` });

    }

}
