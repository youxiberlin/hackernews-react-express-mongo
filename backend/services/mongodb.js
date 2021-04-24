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

const getStory = async () => {
    try {
      const { data } = await axios.get('https://hacker-news.firebaseio.com/v0/item/8863.json');
      return data;
    } catch (e) {
      console.log(e);
    }
};

const getTopStories = async () => {
  try {
    const { data: topStories } = await axios.get('https://hacker-news.firebaseio.com/v0/topstories.json');
    const catchErr = p => p.catch(err => {
      console.log('error', err);
      return { data: {}};
    });
    const getItemPromises = topStories
      .slice(0, 30)
      .map(id => axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`))
      .map(promise => catchErr(promise))
    const items = await Promise.all(getItemPromises);
    const itemsData = items.map(item => item.data);
    return itemsData;
  } catch (e) {
    console.log(e);
  }
};

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
