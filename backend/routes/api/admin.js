  
const express = require("express");
let router = express.Router();
let  admin  = require("../../models/admin");
var bcrypt = require("bcryptjs");
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const config = require("config");
router.get('/', async(req, res)=> {

 
    let candidate = await admin.find();
    console.log(candidate);
    
    return res.json(candidate);
  
    
  
  });


router.post("/register", async (req, res) => {
  let user = await admin.findOne({ username: req.body.username });
  if (user) return res.status(400).send("User with given Email already exist");
  user = new admin();
  user.Name = req.body.Name;
  user.username = req.body.username;
  user.password = req.body.password;
  await user.generateHashedPassword();
  await user.save();
  return res.send(_.pick(user, ["name", "username"]));
});

// Admin Login
router.post("/login", async (req, res) => {
  let user = await admin.findOne({ username: req.body.username });
  if (!user) return res.status(400).send({message:"Invalid Username or password"});
  let isValid = await bcrypt.compare(req.body.password, user.password);
  if (!isValid) return res.status(401).send({message:"Invalid Username or Password"});
  let token = jwt.sign(
    { _id: user._id, name: user.name },
    config.get("jwtPrivateKey")
  );
  return res.json({ message: 'Login Successfull' ,user,token});
});
module.exports = router;