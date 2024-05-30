const { name } = require('ejs');
const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({

    name:{
        type: String,
        required: true,
    },
    descript: {
        type:String,
        required:true,
    },
    price: {
        type: String,
        required:true,
    },
    image: {
        type: String,
        required:true,
    },
    created: {
        type: Date,
        required: true,
        default: Date.now,
    },
});
module.exports = mongoose.model("products", productSchema);