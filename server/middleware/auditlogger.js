const winston = require('winston');

// create the logger into a the file audit.log
const logger = winston.createLogger(
    {
        level: 'info',
        format: winston.format.json(),
        transports: [
            new winston.transports.File({ filename: 'audit.log' })
        ]
    });

// middleware to be called for incoming calls.
const auditLogger = (req, res, next) => {
    logger.info('Request', {
        method: req.method,
        url: req.originalUrl,
        ip: req.ip,
        userAgent: req.headers['user-agent']
    });
    next();
}

// const sqlAuditLogger = (req, res, next) =>{

// }



module.exports = {
    auditLogger
};