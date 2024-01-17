console.log("FSM Loading Requirements");
// Framework that uses http module with additoinal librarites that faciliates the req and response, and middleware 
const express = require('express');
// database module that will connect to sequalize (an orm). Great for suerity to ensure there is no sql injections/etc
const db = require("./server/models");
// module that will parse the request and set the cookie in a req.cookie in json that can be used. I use it to store session keys
const cookieParser = require('cookie-parser')
// module that will parse the request set the req body, param, and query in json that can be used.
const bp = require('body-parser');
// module Cross-Origin Resource Sharing in Node.js
// allows the front end to talk to a 3rd party backend. Usually front and back are sitting in the same server
// Here, it allows the server to look at the origin header. if the request header recieved is the same as the server, then allow.
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;

console.log("FSM init express at port " + port + " ready");

app.use(bp.json());
app.use(cookieParser());
app.use(bp.urlencoded({ extended: true }));


db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });


console.log("FSM Done cookie and body-parser. Now on to CORS ");

if (process.env.NODE_ENV === "production") {
  console.log("FSM Cors Production");
  const corsOptions = {
    origin: 'https://flight-school-management-app-267d2b7528bd.herokuapp.com/',
    optionsSuccessStatus: 200
  }
  app.use(cors(corsOptions));
  app.options('*', cors());
} else {
  console.log("FSM Cors Dev");
  app.use(cors());
  app.options('*', cors());
}

// Serve up static assets (usually on heroku)
console.log("FSM starting app.use(express.static(client/build))");
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

const routes = require('./server/routes');
const { Console } = require('winston/lib/winston/transports');
app.use(routes);

 
db.sequelize.sync({ force: false }).then(function () {
  app.listen(port, () => {
    console.log(`FSM Server listening on port ${port}`);
  });
});  