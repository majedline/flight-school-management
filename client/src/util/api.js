
let base = "http://localhost:3001";
if (process.env.NODE_ENV === "production") {
    base = "https://edo3.herokuapp.com";
}

exports.version = base + '/api/version/';

exports.login = base + '/api/login/'

exports.logout = base + '/api/logout/'

exports.register = base + '/api/register/';

exports.account = base + '/api/account/';

exports.upload = base + '/api/blob/upload';

exports.activeStudents = base+ '/api/student/active-students'

exports.student = base+ '/api/student/'


/* ************************** TO BE IMPLEMENTED ON SERVER ************************** */
exports.emailToResetPassword = base + '/api/email-to-password-reset';