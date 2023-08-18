// set the audit logger
const { auditLogger } = require('../../middleware/auditlogger');

const router = require("express").Router();

const companyPath = "/company/:companyID"

// not all requests need a logger. If we want to set a logger to all requests, move it to the server
router.use(companyPath + '/version', require('./version'));
router.use('/register', auditLogger, require('./register'));
router.use('/login', auditLogger, require('./login'));
router.use('/logout', auditLogger, require('./logout'));
router.use('/account', auditLogger, require('./account'));
router.use('/blob', require('./blob'));
router.use('/student', auditLogger, require('./student'));
router.use('/instructor', auditLogger, require('./instructor'));
router.use('/asset', auditLogger, require('./asset'));
router.use('/flight', auditLogger, require('./flight'));
router.use('/company', auditLogger, require('./company'));

module.exports = router;
