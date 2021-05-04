const express = require('express');
const {
  getTopStories,
  postStory,
  getStory,
  postComment,
  getTopComments,
  getComments,
} = require('./controllers');
let jwtMiddleware = require('./services/jwt');
const HandlerGenerator = require('./services/handleGenerator');

const router = express.Router();
let handlers = new HandlerGenerator();

router.post('/login', handlers.login);
router.get('/', jwtMiddleware.checkToken, handlers.index);
// router.get('/', (req, res) => res.send('hello world'));
router.get('/topStories', getTopStories);
router.post('/story', postStory);
router.post('/comment', postComment);
router.get('/comments/:storyId', getComments);
router.get('/topComments/:storyId', getTopComments);
router.get('/story/:id', getStory);

module.exports = router;
