
let base = "http://localhost:3001";
if (process.env.NODE_ENV === "production") {
    base = "https://flight-school-management-app-267d2b7528bd.herokuapp.com";
}

exports.version = base + '/api/version/';

exports.login = base + '/api/login/';
exports.logout = base + '/api/logout/';
exports.register = base + '/api/register/';

exports.account = base + '/api/account/';

exports.upload = base + '/api/blob/upload';

exports.activeStudents = base + '/api/student/active-students';
exports.student = base + '/api/student/';
exports.studentQuickSearch = base + '/api/student/quick-search';

exports.activeInstructors = base + '/api/instructor/active-instructors';
exports.instructor = base + '/api/instructor/';

exports.activeAssets = base + '/api/asset/active-assets';
exports.asset = base + '/api/asset/';

exports.flight = base + '/api/flight/';
exports.activeFlights = base + '/api/flight/active-flights';

exports.getFiles = base + '/api/blob/';
exports.uploadFile = base + '/api/blob/upload-blob/';


/* ************************** TO BE IMPLEMENTED ON SERVER ************************** */
exports.emailToResetPassword = base + '/api/email-to-password-reset';