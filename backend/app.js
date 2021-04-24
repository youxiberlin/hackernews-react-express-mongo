const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const { port, mongoRoute } = require('./config');
const { initializeMongoDB, insertStory, insertTopStories } = require('./services/mongodb');
const logger = require('./services/logger');
const { getTopStories, postStory } = require('./controllers');

const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.get('/', (req, res) => res.send('hello world'));
app.get('/topStories', getTopStories)
app.post('/story', postStory);
app.listen(port, () => logger.info(`App listening at port ${port}`));
initializeMongoDB(mongoRoute)
  // .then(() => insertTopStories())
  // .catch(e => console.log(e))