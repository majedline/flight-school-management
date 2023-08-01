const getFirstLetterOfWord = (word) => {
    if (word.length > 0) {
        return word[0];
    } else {
        return null;
    }
}

export const getNameInitials = (firstName, lastName) => {
    let f = getFirstLetterOfWord(firstName);
    let l = getFirstLetterOfWord(lastName);
    if (f != null && l != null) {
        return (f + l + "");
    } else {
        return "FSM";
    }
}


