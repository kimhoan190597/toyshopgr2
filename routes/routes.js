const express = require("express");
const router = express.Router();
const Product = require('../models/products');
const multer = require("multer");
const fs = require("fs");
const { title } = require("process");
const products = require("../models/products");

// Ensure the uploads directory exists
const uploadDir = "./uploads";
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Image upload configuration
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const filename = file.fieldname + "_" + Date.now() + "_" + file.originalname;
        console.log("Saving file as:", filename); // Log the filename
        cb(null, filename);
    }
});

var upload = multer({
    storage: storage
}).single("image");

// Insert product to database
router.post('/add', upload, async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded.", type: 'danger' });
        }

        const product = new Product({
            name: req.body.name,
            descript: req.body.description,
            price: req.body.price,
            image: req.file.filename
        });

        await product.save(); // Using async/await instead of callback

        req.session.message = {
            type: 'success',
            message: 'Product added successfully!'
        };
        res.redirect("/");
    } catch (err) {
        res.json({ message: err.message, type: 'danger' });
    }
});

// Get All product route
// Get All product route
router.get("/", async (req, res) => {
    try {
        const products = await Product.find().exec();
        res.render("index", {
            title: "Home Page",
            products: products,
        });
    } catch (err) {
        res.json({ message: err.message });
    }
});


router.get("/add", (req, res) => {
    res.render("add_products", { title: "Add Products" });
});

module.exports = router;


















// const express = require("express");
// const router = express.Router();
// const Product = require('../models/products');
// const multer = require("multer");
// const { name } = require("ejs");


// //image upload
// var storage = multer.diskStorage({
//     destination: function(req,file,cb){
//         cb(null,"./uploads");
//     },
//     filename: function(req,file,cb){
//         cb(null, file.fieldname+"_"+Date.now()+ "_"+file.originalname);
//     },
// });

// var upload = multer({
//     storage:storage,
// }).single("image");

// // insert produtc to database
// router.post('/add',upload, (req,res)=>{
//     const product = new products({
//         name: req.body.name,
//         descrip: req.body.description,
//         price: req.body.price,
//         image: req.file.filename,
//     });
//     product.save((err) => {
//         if(err){
//             res.json( {message: err.message, type: 'danger'});
//         }else{
//             req.session.message = {
//                 type: 'success',
//                 message: 'user added successfully!'
//             };
//             res.redirect("/");
//         }
//     })

// });


// // router
// router.get("/",(req,res) => {
//     res.render('index', {title: "Home Page" });

// });

// router.get("/add",(req,res) => {
//     res.render("add_products",{title: "Add Products" });

// });

// module.exports = router;