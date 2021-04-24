const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const commentSchema = new Schema({
  by: { type: String },
  id: { type: Number },
  parent: { type: Number },
  storyId: { type: Number },
  kids: { type: Array },
  time: { type: Number },
  text: { type: String },
  type: { type: String },
});
const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment;
