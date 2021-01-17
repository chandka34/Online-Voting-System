var express = require('express');
var router = express.Router();
const validateusers = require('../../middlewares/validateUser')
var users= require('../../models/user')
var organizations= require('../../models/organiztions')
var departments= require('../../models/departments')
var bcrypt = require('bcryptjs')
var _ = require ( "lodash");
var jwt = require('jsonwebtoken');
var config = require('config')
var isAdmin = require('../../middlewares/admin')
var CodeGenerator = require('node-code-generator');
const mailgun = require("mailgun-js");
const DOMAIN = 'sandboxb9ebe4aaaaba4802aad4bb6132d2981c.mailgun.org';
const mg = mailgun({apiKey: config.get('MAILGUN_APIKEY'), domain: DOMAIN});

/* GET users listing. */
router.get('/:Auth_id', async(req, res)=> 
{
  if(req.params.Auth_id==1)
  {
    try{
  let user = await users.find().populate('organization').populate('department');
  console.log(user)
  return res.json(user);
    }
    catch{
      return res.json({message:'Something Went Wrong Please Try Again'})
    }
  }
  else{
    return res.json({message:'Authentication Error'})
  }
});
// add user

router.post('/register/:Auth_id',validateusers, async(req, res)=>
{
  if(req.params.Auth_id==1)
  { 
    try{
    var Users = await users.findOne({email : req.body.email});
   if (Users) return res.status(400).json({ message: 'User with given email already exists' });
    let org = await organizations.findOne({organization_id : req.body.organization_id});
    if (!org) return res.status(400).json({ message:"organization with given id do not exists"});
    var dep = await departments.findOne({department_id: req.body.department_id});
    if(!dep) return res.status(400).json({ message:'department with given id do not exists'})
    let user = users();
        user.First_name= req.body.First_name,
        user.Last_name= req.body.Last_name,
        user.email= req.body.email,
        user.password= req.body.password,
        await user.generateHashedPassword();
        user.phone_no= req.body.phone_no,
        user.organization = org,   
        user.department=dep
        await user.save();
      
        var generator = new CodeGenerator();
        var pattern = '######';
        var howMany = 1;
        // Generate an array of random unique codes according to the provided pattern:
        var codes = generator.generateCodes(pattern, howMany, 
          {expiresIn:'50m'});
             

    const data = {
      from:'noreply@hello.com',
      to: req.body.email,
      subject: 'Account activation',
     html:`
            <h2>Click on the link to activate your account</h2>    
            <p>${codes}</p>
     `
    };
    return user.updateOne({ ActivationCode : codes}, function(err,success) {
      if (err){
        return res.status(400).json({message:"unsuccessfull attempt"});
      }
      else{
    mg.messages().send(data, function (error, body) {
     if(error){
       return res.json({
         error: error.message
       })
     }
     return res.json({message:'Email activation code is sent to your email. Kindly check your email',codes,user})
    });
     
  }
})
    }
catch{
  return res.json({message:'Something Went Wrong Please Try Again'})
}
}
else{
  return res.json({message:'Authentication Error'})
}

});

//activate user
router.post('/ActivateAccount/:Auth_id' , async(req, res)=>
{
  if(req.params.Auth_id==1)
  {
  try{
    var Users = await users.findOne({ActivationCode:req.body.ActivationCode});
    if (!Users) return res.status(400).json({ message: 'incorrect or expired code' }); 
    
    const obj={
      ActivationStatus:true,

    }
    console.log(obj)
 Users= _.extend(Users, obj);
   
 await Users.save((err,result)=> {
    if (err){
      return res.status(400).json({message:"Unsuccessfully Account activated "});
    }
    else{
      return res.status(400).json({message:"Account activated successfully"});
    }
    
   })
  }

  catch(err)
    {
      return res.status(400).send({ message: 'Unsuccessfull activation' })
    }
  }
  else{
    return res.json({message:'Authentication Error'})
  }
});

//Admin Login



//user login
router.post('/login', async(req,res) =>
{ try{
  var Status = await users.findOne({ActivationStatus : true});
  if (!Status) return res.status(400).json({ message: 'Your account is not activated. kindly activated your account' });
  var Users = await users.findOne({email : req.body.email});
  if (!Users) return res.status(400).json({ message: 'Invalid Email or Password' });
  let valid = await bcrypt.compare(req.body.password,Users.password);
  if (!valid) return res.status(400).json({ message: 'Invalid User or Password' });
  let token=jwt.sign(
    ({_id: Users._id, email:Users.email, role:Users.role}),
    config.get('jwtPrivateKey')
  );;

  return res.json({ message: 'Login Successfull',Users,token});
} 
catch(err){
  return res.status(400).json({ message: 'Login Successfull' });
    }

});


router.get('/:email/:Auth_id', async(req, res)=>
{   
  if(req.params.Auth_id==1)
  {
    try{
    let department = await users.find( {email: req.params.email});
    if(!department) return res.status(400).json("email not present");
    return res.send({message:'okk',department});
}
    catch(err){
    return res.status(400).json("invalid email");
      }
    }
    else{
      return res.json({message:'Authentication Error'})
    }
});



//forget password
router.put('/forgetPassword/:Auth_id', async(req, res)=>
{   
  if(req.params.Auth_id==1)
  {
      try{
        const {email} = req.body;
      var Users = await users.findOne({email :email});
      if (!Users) return res.status(400).json({ message: 'User with Given Id does not exists' });
        var generator = new CodeGenerator();
        var pattern = '######';
        var howMany = 1;
        // Generate an array of random unique codes according to the provided pattern:
        var codes = generator.generateCodes(pattern, howMany, 
          {expiresIn:'50m'});
      const data = {
        from:'noreply@hello.com',
        to: email,
        subject: 'Password reset',
       html:`
              <h2>Your code for password reset is</h2>    
              <p>${codes}</p>
       `
      };
      
     return Users.updateOne({ resetLink : codes}, function(err,success) {
      if (err){
        return res.status(400).json({message:"incorrect or expired link"});
      }
      else{
        mg.messages().send(data, function (error, body) {
          if(error){
            return res.json({
              error: error.message
            })
          }
          return res.json({message:'A password reset code has been sent. Kindly check your email',codes})
         });
     
      }
    })
    
   
   
}
    catch(err){
    return res.status(400).json({ message:"Unsuccessfull attempt"});
      }
    }
    else{
      return res.json({message:'Authentication Error'})
    }
});
//reset password
router.put('/resetPassword/:Auth_id', async(req, res)=>
{ 
  if(req.params.Auth_id==1)
  {
    try{
  const {resetLink, newPass}= req.body;
  
    
      var Users = await users.findOne({resetLink});
      if (!Users) return res.status(400).json({ message: 'incorrect or expired code' });   
        const obj={
          password:newPass,
    
        }
        console.log(obj)
     Users= _.extend(Users, obj);
      await Users.generateHashedPassword();
     await Users.save((err,result)=> {
      if (err){
        return res.status(400).json({message:"password reset error"});
      }
      else{
          return res.status(200).json({message:'Password has been changed successfully'})
      }
     })
    }
    catch{
      return res.json({message:'Something Went Wrong Please Try Again'})
    }
  }
  else{
    return res.json({message:'Authentication Error'})
  }
});

//updation

router.put("/:id/:Auth_id", validateusers, async (req, res) => 
{
  if(req.params.Auth_id==1)
  {
  try{
  let user = await users.findById(req.params.id);
  var Users = await users.findOne({email : req.body.email});
    if (!Users) return res.status(400).json({ message: 'User with given email donot exists' });
    let org = await organizations.findOne({organization_id : req.body.organization_id});
    if (!org) return res.status(400).json({ message:"organization with given id do not exists"});
    var dep = await departments.findOne({department_id: req.body.department_id});
    if(!dep) return res.status(400).json({ message:'department with given id do not exists'})
 
  user.First_name= req.body.First_name,
  user.Last_name= req.body.Last_name,
  user.email= req.body.email,
  user.password= req.body.password,
  await user.generateHashedPassword();
  user.phone_no= req.body.phone_no,
  user.organization = org,   
  user.department=dep
  await user.save();
  return res.json({message:"updation Successfull",user});
 }

 catch{
  return res.json({message:"unsuccessfull Updation"});
 }
}
else{
  return res.json({message:'Authentictaion Error'})
}
});


module.exports = router;


