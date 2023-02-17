const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

mongoose.connect(process.env.MONGO_URI)
  .then(response => console.log('mongodb esta andando joya mostro'))
  .catch(err =>console.log('mongo no anda mostro', err))