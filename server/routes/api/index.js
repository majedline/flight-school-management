const router = require("express").Router();

router.use('/version', require('./version'));
router.use('/register', require('./register'));
router.use('/login', require('./login'));
router.use('/logout', require('./logout'));
router.use('/account', require('./account'));
router.use('/blob', require('./blob'));


module.exports = router;
