const Story = require('./models/story');

const getTopStories = async (req, res) => {
  try {
    const topStories = await Story.find();
    res.status(200).send({
      status: 200,
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
      status: 200,
      data: story
    });
  } catch (e) {
    console.log(e)
  }
}


const postStory = async (req, res) => {
  const data = req.body;
  const story = new Story(data);
  story.save((err) => {
    if (err) console.log(err)
    else {
      console.log(story,'saved');
      res.status(200).send({
        message: 'Successfully saved!'
      })
    }
  });

}

module.exports = {
  getTopStories,
  postStory,
  getStory
};
