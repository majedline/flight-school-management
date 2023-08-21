
const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
    let jwtpass = "welcometoadmcanxy2023";
    let cookieName = "fsmaccesstoken";

    if (process.env.NODE_ENV === "production") {
        jwtpass = process.env.jwtpass;
        cookieName = process.env.cookieName;
    }

    // Get the token from the header, if not available, check the cookie.
    let token = req.header('x-auth-token');
    if (token === undefined) {
        token = req.cookies.fsmaccesstoken;
    }

    if (!token) {
        return res.status(401).send({ error: `FSM Error - Token Not found` });
    }

    try {
        const verified = jwt.verify(token, jwtpass);
        req.user = verified.user;
        console.log("req.user", req.user);
        next();

    } catch (error) {
        return res.status(401).send({ error: `FSM Error - Token Not valid ${error}` });

    }

}
