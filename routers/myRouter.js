const express = require('express')
const router = express.Router()
//call product model
const Product = require("../model/products")

router.get("/",(req,res) =>{
    try{
        Product.find().then((data) => {
            res.render('index.ejs', {products:data})
        })
    }catch (err){
        console.log(err)
    }
})

router.get("/add",(req,res) =>{
    res.render('add') //viwes/add.ejs
})

router.get("/manage",(req,res) =>{
    // res.render('manage') //viwes/manage.ejs
    try{
        Product.find().then((data) => {
            res.render('manage.ejs', {products:data})
        })
    }catch (err){
        console.log(err)
    }
})

router.get("/insert", (req, res)=>{
    // console.log(req.query.item_price) //query specific attribute
    console.log(req.query) //query all
})

router.get("/delete/:id", (req, res)=>{
    Product.findByIdAndDelete(req.params.id, {useFileAndModifiy:false}).then(err =>{
        if (err) console.log(err)
        res.redirect('/manage')
    })
})

//Show data detail
router.get("/:id", (req, res)=>{
    try{
        const product_id = req.params.id
        Product.findOne({_id:product_id}).then((data)=>{
            res.render('product.ejs', {product:data})
        })
    }catch (err) {
        console.log(err)
    }
})

//Upload file using multer
const multer = require('multer')
const storage = multer.diskStorage({
    destination:function(req, file, cb){
        cb(null, "./public/images/products") //  uploaded file' destination
    },
    filename:function(req, file, cb){
        cb(null, Date.now() + ".png") // To avoid duplicate name -> change file name by DataTime
    }
})

const upload = multer({
    storage:storage
})

router.post("/insert", upload.single('image'),(req, res)=>{
    // console.log(req.file)
    try{
        let data = new Product({
        name:req.body.name,
        price:req.body.price,
        image:req.file.filename,
        description:req.body.description
    })
        Product.saveProduct(data)
        res.redirect('/')
    }catch (err){
        console.log(err)
    }
})

router.post("/edit",(req, res)=>{
    console.log(req.body.description)
    const edit_id = req.body.edit_id
    Product.findOne({_id:edit_id}).then((data)=>{
        res.render('edit.ejs', {product:data})
    })
})

router.post("/update/", (req, res)=>{
    const update_id = req.body.update_id
    let new_data = {
        name:req.body.name,
        price:req.body.price,
        description:req.body.description
    }
    Product.findByIdAndUpdate(update_id, new_data, {useFileAndModifiy:false}).then(err=>{
        res.redirect("/manage")
    })
    console.log(new_data)
    // res.redirect('/')
})


module.exports = router
