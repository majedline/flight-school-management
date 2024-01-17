const getFirstLetterOfWord = (word) => {
    if (word.length > 0) {
        return word[0];
    } else {
        return null;
    }
}

exports.getNameInitials = (firstName, lastName) => {
    let f = getFirstLetterOfWord(firstName);
    let l = getFirstLetterOfWord(lastName);
    if (f != null && l != null) {
        return (f + l + "");
    } else {
        return "FSM";
    }
}


exports.formatDate = (inputDate) => {
    const date = new Date(inputDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hour = date.getHours() % 12 || 12;
    const minute = String(date.getMinutes()).padStart(2, '0');
    const ampm = date.getHours() < 12 ? 'AM' : 'PM';

    return `${year}-${month}-${day}, ${hour}:${minute} ${ampm}`;
}

exports.extractErrorMsgs = (errorArray) => {
    return errorArray.map(error => error.msg)
}