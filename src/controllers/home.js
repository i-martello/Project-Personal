const ctrl = {}
const { image } = require('../models')

const sidebar = require('../helpers/sidebar')

ctrl.index = async (req, res)=>{
  const imagen = await image.find().sort({timestamp: -1}).lean()
  let viewModel = {images: []};
  viewModel.images = imagen;
  viewModel = await sidebar(viewModel)
  console.log(viewModel)
  res.render('index', viewModel);
}

module.exports = ctrl;  