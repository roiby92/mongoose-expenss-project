const express = require('express')
const app = express()
const api = require('./server/routes/api')
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/',api)

const port = 3000
app.listen(port, function () {
    console.log('server is runing');
})