const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const jwt = require('jsonwebtoken');
const port = 8080;
const loginRoutes = require("./routes/login");
const productRoutes = require("./routes/product")
const adminLoginRoutes = require("./routes/adminLogin");
const User = require('./model/user');
const Admin = require('./model/admins');
var secret = "RESTAPI";
mongoose.connect('mongodb://localhost/Commercial');


app.use(bodyparser.json());


app.use("/products", async(req,res,next)=>{
    if(req.headers.authorization){
        const token = req.headers.authorization;
        jwt.verify(token, secret,async(err,decoded)=>{
            if(err){
                res.status(500).json({
                    status:"failed",
                    message:"User not authenticated"
                })
            }
            // console.log(decoded.data);
            const user = await User.findOne({_id: decoded.data})
            req.user = user._id;
            next();
        })
    }   
    else{
        return res.status(500).json({
            status : "failed",
            message : "Invalid token"
        })
    }
})



app.use("/customers", async(req,res,next)=>{
    if(req.headers.authorization){
        const token = req.headers.authorization;
        jwt.verify(token, secret,async(err,decoded)=>{
            if(err){
                res.status(500).json({
                    status:"failed",
                    message:"Admin not authenticated"
                })
            }
            // console.log(decoded.data);
            const user = await Admin.findOne({_id: decoded.data})
            req.user = user._id;
            next();
        })
    }   
    else{
        return res.status(500).json({
            status : "failed",
            message : "Invalid token"
        })
    }
})

app.use("/",loginRoutes);
app.use("/",adminLoginRoutes);
app.use("/products",productRoutes);

app.listen(port,()=>{
    console.log(`server is running`)
})