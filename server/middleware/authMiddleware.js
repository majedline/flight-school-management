
const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {

    // Get the token from the header, if not available, check the cookie.
    let token = req.header('x-auth-token');
    if (token === undefined) {
        token = req.cookies.ispect_access_token;
    }
    
    if (!token) {
        return res.status(401).send({ error: `FSM Error - Token Not found` });
    }

    try {
        const verified = jwt.verify(token, config.get('jwtpass'));
        req.user = verified.user;
        next();

    } catch (error) {
        return res.status(401).send({ error: `FSM Error - Token Not valid ${error}` });

    }

}
