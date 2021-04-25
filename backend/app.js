const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const { port, mongoRoute } = require('./config');
const { initializeMongoDB } = require('./services/mongodb');
const logger = require('./services/logger');
const routes = require('./routes');

const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(routes);
app.use('/login', (req, res) => {
  res.send({
    token: 'test123'
  });
});

app.listen(port, () => logger.info(`App listening at port ${port}`));
initializeMongoDB(mongoRoute);
