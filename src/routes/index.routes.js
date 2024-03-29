const {Router} = require('express')
const router = Router()
const home = require('../controllers/home')
const image = require('../controllers/image')
const upload = require('../controllers/upload')

module.exports = app =>{
  app.use(router)
  router.get('/', home.index )
  router.get('/images/:image_id', image.index )
  router.get('/publicar', upload.index)
  router.post('/images', image.create ) 
  router.post('/images/:image_id/like', image.like )
  router.post('/images/:image_id/comment', image.comment )
  router.delete('/images/:image_id', image.remove)

}