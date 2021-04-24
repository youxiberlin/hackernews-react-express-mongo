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

module.exports = {
  getTopStories
};
