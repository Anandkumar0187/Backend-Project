const express = require('express');
const router = express.Router();
const Product = require('../model/product');

router.post("/", async(req,res)=>{
    const products = await Product.create({
        name : req.body.name,
        category : req.body.category,
        image : req.body.image,
        user: req.user
    })
    res.status(200).json({
        status : "success",
        products
    })
})

router.get('/',async(req,res)=>{
    const data = await Product.find();
    res.status(200).json({
        status : "success",
        posts : data
    })
})
router.get('/findByName/:name',async(req,res)=>{
    const data = await Product.find({name : req.params.name});
    res.status(200).json({
        status : "success",
        posts : data
    })
})
router.get('/findByCategory/:category',async(req,res)=>{
    const data = await Product.find({category : req.params.category});
    res.status(200).json({
        status : "success",
        posts : data
    })
})

router.put('/:id',async(req,res)=>{
    const data = await Product.updateOne({_id : req.params.id},{name : req.body.name, category: req.body.category, image : req.body.image});
    res.status(200).json({
        status : "success",
        data
    })
})
router.delete('/:id',async(req,res)=>{
    const data = await Product.deleteOne({_id : req.params.id});
    res.status(200).json({
        status : "success",
        data
    })
})

module.exports = router;