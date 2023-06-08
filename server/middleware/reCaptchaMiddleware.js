const axios = require('axios');


// verify Human
module.exports = async function (req, res, next) {

    if (process.env.NODE_ENV === "production") {

        console.log("verify Human");
        try {
            
            const { recaptcha_token } = req.body;

            axios
                .post("https://www.google.com/recaptcha/api/siteverify",
                    {
                        "secret": process.env.CAPTCHA_COMMUNICATION_KEY,
                        "response": recaptcha_token,
                    },
                    {
                        headers: { "Content-Type": "application/x-www-form-urlencoded" }
                    },
                )
                .then(response => {
                    if (response) {
                        if (response.data.success === true) {
                            console.log("Human")
                            next();
                        } else {
                            console.log("Robot");
                            return res.status(401).send({ error: `FSM Error - Not a Human` });
                        }
                    } else{
                        return res.status(401).send({ error: `FSM Error - Not a Human` });
                    }

                }).catch(err => {
                    return res.status(500).send({ error: `FSM Error - Not a Human: ${err}` });
                });

        } catch (error) {
            return res.status(500).send({ error: `FSM Error - Not a Human: ${error}` });
        }
    } else {
        next();
    }
}




