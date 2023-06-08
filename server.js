console.log("FSM Loading Requirements");
const express = require('express');
const db = require("./server/models");
const cookieParser = require('cookie-parser')
const bp = require('body-parser');
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
    origin: 'https://edo3.herokuapp.com/',
    optionsSuccessStatus: 200
  }
  app.use(cors(corsOptions));
  app.options('*', cors());
} else {
  console.log("FSM Cors Dev");
  app.use(cors());
}

// Serve up static assets (usually on heroku)
console.log("FSM starting app.use(express.static(client/build))");
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

const routes = require('./server/routes');
app.use(routes);



db.sequelize.sync({ force: false }).then(function () {
  app.listen(port, () => {
    console.log(`FSM Server listening on port ${port}`);
  });
});