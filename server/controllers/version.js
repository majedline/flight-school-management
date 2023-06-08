// Get the current version
const version = async (req, res) => {
    console.log("GET version");
    try {
        return res.send({ "message": "FSM Server version Alpha 0.1" });
    } catch (error) {
        return res.status(500).send({ error: `FSM Error - version: ${error}` });
    }
}

module.exports = {
    version
}; 