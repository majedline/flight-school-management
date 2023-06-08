const setting = "dev";// live/dev
const debug = true;

const getEnvironment = () => {
    return setting;
}
const isDebugMode = ()=>{
    return debug;
}
module.exports = {
    getEnvironment
}; 

