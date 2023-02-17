const mongoose = require('mongoose')
const { Schema } = require('mongoose')


const imageSchema = new Schema({
  title: {type: String},
  description: {type: String},
  filename: {type: String},
  views: {type: Number, default: 0},
  likes: {type: Number, default: 0},
  timestamp:{type: Date, default: Date.now},
  uniqueId: {type: String}
});


module.exports = mongoose.model('image', imageSchema, 'posts')