const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./config/database');

const app = express();

const port = 4000;
const food = require('./routes/food');

//Database stuff
mongoose.Promise = global.Promise;
mongoose.connect(config.database);
mongoose.connection.on('connected', () => {
  console.log('Connected to database'+ config.database);
});

mongoose.connection.on('error', (err) => {
  console.log('Error: Database ' +err);
});

app.use(cors());

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "public")));

app.use('/food', food);

app.get('/', (req, res) => {
  res.send('Invalid endpoint');
});

app.listen(port, function () {
  console.log('listening on port ' + port);
});
