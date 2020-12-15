
const Product = require("../models/product");
const slugify = require('slugify');
const shortid = require('shortid');
exports.createProduct = (req,res)=>{
   //res.status(200).json({file:req.files,body:req.body});
   const {name,price,description,category,createdBy,quantity} = req.body;
   let productPictures=[];
   if(req.files.length > 0){
      productPictures= req.files.map(file=>{
           return {img:file.filename}
       });
   }
   const product = new Product({
       name:name,
       slug:slugify(name),
       price,
       description,
       productPictures,
       category,
       quantity,
       createdBy:req.user._id

   })
   product.save(((err, product) => {
     if (err) return res.status(400).json({ err });
     if (product) {
       res.status(201).json({ product });
     }
   }));
};

exports.getProducts = (req, res) => {
  Product.find({}).exec((err, products) => {
    if (err) return res.status(400).json({ err });
    if (products) {
      
      res.status(201).json({ products });
    }
    else{
        res.status(201).json({message:"No products Available"});
    }
  });
};