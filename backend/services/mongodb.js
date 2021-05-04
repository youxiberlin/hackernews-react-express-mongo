const axios = require('axios');
const mongoose = require('mongoose');
const logger = require('./logger');
const Story = require('../models/story');

const connect = (mongoRoute) => mongoose.connect(mongoRoute, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});


const insertStory = async () => {
  const data = await getStory();
  return Story.create(data);
}

const insertTopStories = async() => {
  const data = await getTopStories();
  return Story.insertMany(data, (error, docs) => {
    if (error) logger.error('mongoDB could not insert top stories');
    else logger.info(`mongoDB successfully inserted ${docs.length} stories`);
  });
}

const initializeMongoDB = (mongoRoute) => {
  mongoose.connection.on('connected', () => logger.info(`connected to ${mongoRoute}`));
  mongoose.connection.on('error', () => logger.error(`mongoDB connection error`));
  mongoose.connection.on('disconnected', () => logger.warn(`mongoDB is disconnected`));
  return connect(mongoRoute);
};

module.exports = { initializeMongoDB, insertStory, insertTopStories };
