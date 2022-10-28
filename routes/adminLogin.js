const express = require("express");
const router = express.Router();
const Admin = require("../model/admins");
const User = require("../model/user");
var secret = "RESTAPI";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");

router.post("/registerAdmin", body("email").isEmail(), (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(500).json({
        errors: errors.array(),
      });
    }
    const { name, email, password } = req.body;
    bcrypt.hash(password, 10, async (err, hash) => {
      if (err) {
        res.status(500).json({
          status: "failed",
          messsage: err.message,
        });
      } else {
        const emailId = await Admin.findOne({ email: req.body.email });
        if (emailId) {
          res.status(500).json({
            status: "failed",
            message: "Admin already registered try with different email ID",
          });
        } else {
          const data = await Admin.create({
            name,
            email,
            password: hash,
          });
          res.status(200).json({
            status: "Success",
            data,
          });
        }
      }
    });
  } catch (e) {
    res.status(500).json({
      status: "failed",
      message: e.message,
    });
  }
});

router.get("/Customers", async (req, res) => {
  const data = await User.find();
  // console.log(data);
  res.status(200).json({
    status: "success",
    data,
  });
});

router.post("/loginAdmin", body("email").isEmail(), async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(500).json({
        errors: errors.array(),
      });
    }
    const { email, password } = req.body;
    const data = await Admin.findOne({ email });
    if (!data) {
      return res.status(500).json({
        status: "failed",
        message: "Admin is not registered",
      });
    }
    bcrypt.compare(password, data.password, (err, result) => {
      if (err) {
        res.status(500).json({
          status: "failed",
          message: err.message,
        });
      }
      if (result) {
        const token = jwt.sign(
          {
            exp: Math.floor(Date.now() / 1000) + 60 * 60,
            data: data._id,
          },
          secret
        );

        res.status(200).json({
          status: "success",
          token,
        });
      }
    });
  } catch (e) {
    res.status(500).json({
      status: "failed",
      message: e.message,
    });
  }
});

module.exports = router;
