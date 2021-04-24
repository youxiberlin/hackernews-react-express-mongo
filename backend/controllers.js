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

const postStory = async (req, res) => {
  const data = {
    "by" : "spenvo",
    "descendants" : 36,
    "id" : 26922448,
    "kids" : [ 26923454, 26922745, 26922455, 26923849, 26923681, 26923782, 26923350, 26923596, 26923470, 26924245, 26923130 ],
    "score" : 197,
    "time" : 1619241532,
    "title" : "Remote code execution in Homebrew by compromising the official Cask repository",
    "type" : "story",
    "url" : "https://blog.ryotak.me/post/homebrew-security-incident-en/"
  };
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
  postStory
};
