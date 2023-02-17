const {Comment, image} = require('../models')

module.exports = {
  async newest () {
    const comments = await Comment.find().lean()
      .limit(5)
      .sort({timestamp: -1})

    for (const comment of comments){
      const imagen = await image.findOne({_id: comment.image_id}).lean()
      comment.image = imagen
    }
    return comments;
  }
}