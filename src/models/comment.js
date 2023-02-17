const { Schema, model } = require('mongoose')
const { ObjectId } = Schema;

const CommentSchema = new Schema({
  image_id: {type: ObjectId},
  name: {type: String},
  comment: {type: String},
  timestamp: {type: Date, default: Date.now},
  image: {type: Object}
})

module.exports = model('Comment', CommentSchema, 'Comments')