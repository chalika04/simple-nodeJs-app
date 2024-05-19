//using mongoose
const mongoose = require('mongoose')

//connect mongoose
const dburl = 'mongodb+srv://chalika:chalika1991@clusterrest.ek3rago.mongodb.net/productDB'
mongoose.connect(dburl, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
}).catch(error => console.error(error))
const db = mongoose.connection

db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

//design schema
const productSchema = new mongoose.Schema({
      name: {
        type: String,
        required: true
      },
      price: {
        type: Number,
        required: true
      },
      image:{
        type: String,
        //require: true
      },
      description:{
        type: String,
        //require: true
      },
      submitedDate: {
        type: Date,
        required: true,
        default: Date.now
      }
})

//create model
const Product = mongoose.model("products_model", productSchema)

//export model
module.exports = Product

//define add data
module.exports.saveProduct = function(model, data){
    model.save(data)
}
