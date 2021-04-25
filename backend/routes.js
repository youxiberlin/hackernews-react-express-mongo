const express = require('express');
const {
  getTopStories,
  postStory,
  getStory,
  postComment,
  getTopComments,
  getComments,
} = require('./controllers');

const router = express.Router();

router.get('/', (req, res) => res.send('hello world'));
router.get('/topStories', getTopStories);
router.post('/story', postStory);
router.post('/comment', postComment);
router.get('/topComments/:storyId', getTopComments);
router.get('/story/:id', getStory);
rouer.get('./comments/:storyId', getComments);

module.exports = router;
