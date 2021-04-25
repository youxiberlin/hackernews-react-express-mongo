const Story = require('./models/story');
const Comment = require('./models/comment');

const getTopStories = async (req, res) => {
  try {
    const topStories = await Story.find();
    res.status(200).send({
      data: topStories
    });
  } catch (e) {
    console.log(e);
  }
};

const getStory = async (req, res) => {
  try {
    const story = await Story.findOne({ id: +req.params.id}).exec();
  
    res.status(200).send({
      data: story
    });
  } catch (e) {
    console.log(e);
  }
};

const getTopComments = async (req, res) => {
  try {
    const { storyId } = req.params;
    const arr = await Comment.find({ parent: +storyId });
    res.status(200).send({
      data: arr,
    });
  } catch (e) {
    console.log(e);
  }
};

const getComments = async (req, res) => {
  try {
    const { storyId } = req.params;
    const arr = await Comment.find({ storyId: +storyId });
    res.status(200).send({
      data: arr,
    });
  } catch (e) {
    console.log(e);
  }
};

const postStory = async (req, res) => {
  try {
    const data = req.body;
    const story = new Story(data);
    story.save();
    res.status(200).send({
      message: 'Successfully saved!'
    });
  } catch (e) {
    console.log(e);
  }
}

const postComment = async (req, res) => {
  try {
    const data = req.body;
    if (data.parent === data.storyId) {
      const story = await Story.findOne({ id: +data.storyId });
      story.kids.push(data.id);
      await story.save();
    } else {
      const parentComment = await Comment.findOne({ id: +data.parent });
      parentComment.kids.push(data.id);
      await parentComment.save();
    }

    const comment = new Comment(data);
    comment.save((err) => {
      if (err) console.log(err)
      else {
        console.log(comment,'saved');
        res.status(200).send({
          message: 'Successfully saved!'
        });
      }
    });
  } catch (e) {
    console.log(e);
  }
}

module.exports = {
  getTopStories,
  postStory,
  getStory,
  postComment,
  getComments,
  getTopComments
};
