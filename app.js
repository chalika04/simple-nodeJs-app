const express = require('express')
const path = require('path')
const app = express()
const router = require('./routers/myRouter')
const mongoose = require('mongoose')

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended:false}))
app.use(router)
app.use(express.static(path.join(__dirname,'public')))

// mongoose.connect('mongodb')


app.listen(3000,()=>{
    console.log("start server at port 3000")
})