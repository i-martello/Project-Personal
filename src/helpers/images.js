const { image } = require('../models')

module.exports = {

  async popular() {
    const images = await image.find().lean()
      .limit(9)
      .sort({likes: -1})
      return images
  }

};