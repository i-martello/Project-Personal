require('dotenv').config()
const express = require('express')
const config = require('./server/config.js')

const app = config(express())

require('./database')

app.listen(app.get('port'), ()=>{
  console.log('Server on port ', app.get('port'))
})