const path = require('path')
const { randomNumber } = require('../helpers/libs')
const fs = require('fs-extra')
const { image, Comment } = require('../models')
const sidebar = require('../helpers/sidebar')

const ctrl = {}

ctrl.index = async (req, res) => {
  let viewModel = { imagen: {}, comments: {}}
  const imagen = await image.findOne({filename: {$regex: req.params.image_id}}).lean();
  if(imagen){
    viewModel.imagen = imagen
    const comments = await Comment.find({image_id : imagen._id}).lean()
    viewModel.comments = comments
    viewModel = await sidebar(viewModel)
    res.render('partials/image', viewModel )
  } else {
    res.redirect('/')
  }
}

ctrl.create = (req, res) => {
  const saveImage = async () =>{
  const imgUrl = randomNumber()
  const images = await image.find({filename: imgUrl})
  if(images.length > 0){
    saveImage()
  } else {
  const imageTempPath = req.file.path
  const ext = path.extname(req.file.originalname).toLowerCase()
  const targetPath = path.resolve(`src/public/upload/${imgUrl}${ext}`)

  if (ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif'){
    await fs.rename(imageTempPath, targetPath);
    const newImg = new image({
      title: req.body.title,
      filename: imgUrl + ext,
      description: req.body.description,
      uniqueId: imgUrl
    });
    const imageSaved = await newImg.save()
    res.redirect('/')
  } else {
    await fs.unlink(imageTempPath)
    res.status(500).json({error: 'que poronga intentas subir pelotudo'})
  }
  }}
  saveImage()
};

ctrl.like = async (req, res) => {
  const Image = await image.findOne({filename: {$regex: req.params.image_id }}) 
  if(Image){
    Image.likes = Image.likes + 1
    await Image.save()
    res.json({likes: Image.likes})
  } else {
    res.status(500).json({error: 'Error interno brother'})
  }
}

ctrl.comment = async (req, res) => {
  const imgComment =  await image.findOne({
    filename: { $regex: req.params.image_id },
  });
  if(imgComment){
    const newComment = new Comment({
      name: req.body.name,
      comment: req.body.comment,
      image_id: req.body.description,
      image: Object
    });
    newComment.image_id = imgComment._id
    console.log(newComment)
    await newComment.save()
    res.redirect('/images/' + imgComment.uniqueId)
  } else {
    res.redirect('/')
  }

}

ctrl.remove = async (req, res) => {
  const imagen = await image.findOne({filename: {$regex: req.params.image_id}})
  if(imagen) {
    await fs.unlink(path.resolve('./src/public/upload/' + imagen.filename))
    await Comment.deleteOne({image_id : imagen._id});
    await imagen.deleteOne({image_id : imagen._id});
    res.json(true)
  }
}
module.exports = ctrl