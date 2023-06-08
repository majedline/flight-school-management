const path = require("path");
const router = require("express").Router();
const apiRoutes = require("./api");


// ================
var currentdate = new Date();
var datetime = "Last Sync: " + currentdate.getDate() + "/"
  + (currentdate.getMonth() + 1) + "/"
  + currentdate.getFullYear() + " @ "
  + currentdate.getHours() + ":"
  + currentdate.getMinutes() + ":"
  + currentdate.getSeconds();
console.log(`***************** ${currentdate} *****************`);
// ================

// API Routes
router.use("/api", apiRoutes);

// If no API routes are hit, send the React app
router.use(function (req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

router.use("*", function (req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = router;


