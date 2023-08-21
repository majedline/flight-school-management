const getDatetimeNow = () => {
    var currentdate = new Date();
    var datetime = currentdate.getDate() + "/"
        + (currentdate.getMonth() + 1) + "/"
        + currentdate.getFullYear() + " @ "
        + currentdate.getHours() + ":"
        + currentdate.getMinutes() + ":"
        + currentdate.getSeconds();
    return datetime;
}

function toDateTime(secs) {
    let x = new Date(secs * 1000);
    return x.toString();
}

const fireJsonToList = (items) => {
    var results = [];
    items.forEach((doc) => {
        let result = { "id": doc.id, "data": doc.data() };
        results.push(result);
    });
    return results;
}

const convertFireDocumentRecordToJsonResponse = (item, isInnerObject = false) => {
    let result = {};

    // const _fieldsProto = item._fieldsProto;

    const fields = (isInnerObject) ? item : item._fieldsProto;

    for (const [key, value] of Object.entries(fields)) {
        if (value.stringValue)
            result[key] = value.stringValue;
        else if (value.integerValue)
            result[key] = value.integerValue;
        else if (value.doubleValue)
            result[key] = value.doubleValue;
        else if (value.timestampValue)
            result[key] = toDateTime(value.timestampValue.seconds);
        else if (value.mapValue) {
            result[key] = convertFireDocumentRecordToJsonResponse(value.mapValue.fields, true);
        }
    }

    return result;
}


const cleanUpDataToSaveToFireDB = (firePayLoad) => {
    let result = {};

    for (const [key, value] of Object.entries(firePayLoad)) {
        if (value == undefined) {
            result[key] = "";
        } else {
            result[key] = value;
        }
    }
    return result;
}



const getTokenKey = () => {
    // const config = require('config');

    let jwtpass = "welcometoadmcanxy2023";
    let cookieName = "fsmaccesstoken";
    
    if (process.env.NODE_ENV === "production") {
        jwtpass = process.env.jwtpass;
        cookieName = process.env.cookieName;
    }

    if (process.env.NODE_ENV === "production") {
        console.log("Getting production key");
        return process.env.jwtpass
    } else {
        console.log("Getting Dev key");
        return jwtpass;
    }

}

module.exports = {
    getDatetimeNow, toDateTime, fireJsonToList, getTokenKey, convertFireDocumentRecordToJsonResponse, cleanUpDataToSaveToFireDB
};