const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const storySchema = new Schema({
	by: { type: String },
  descendants: { type: Number },
  id: { type: Number },
  kids: { type: Array },
  score: { type: Number },
  time: { type: Number },
  title: { type: String },
  type: { type: String },
  url: { type: String },
});
const Story = mongoose.model('Story', storySchema)

module.exports = Story;
