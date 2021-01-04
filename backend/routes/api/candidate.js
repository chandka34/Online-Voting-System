var express = require('express');
var router = express.Router();
const validatecandidates = require('../../middlewares/validatecandidate')
var candidates= require('../../models/candidates');
var departments = require('../../models/departments')
const users = require('../../models/user');
const posts = require('../../models/posts')
var organizations = require('../../models/organiztions');
var isCandidate = require('../../middlewares/candidate')

const multer = require('multer');
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

//get Single Candidate
router.get('/single/:id', async(req, res)=> {
 try{
  let candidate = await candidates.findOne({_id:req.params.id})
  console.log(candidate);
  
  return res.json({message:"ok",candidate});
}
catch{
 return res.json({message:"invalid ID"});
}
});

//candidate of specified organization
router.get('/organization/:id', async(req, res)=> {
 try{
  let candidate = await candidates.find({organization_id:req.params.id}).populate('user').populate('post');
  return res.json({message:"ok",candidate});
 }
 catch{
  return res.json({message:"invalid ID"});
 }
});

router.get('/Organizations/:id', async(req, res)=> {
  try{
   let candidate = await candidates.find({organization_id:req.params.id}).populate('user').populate('post');
   return res.json(candidate);
  }
  catch{
   return res.json({message:"invalid ID"});
  }
  
 
 });
// Departmental Candidate
router.get('/:org_id/:dep_id', async(req, res)=> {
  let candidate = await candidates.find({organization_id:req.params.org_id,department_id:req.params.dep_id}).populate('user').populate('post');
  console.log(candidate);
  return res.json(candidate);
});

// candidate w.r.t post
router.get('/post/:org_id/:p_id', async(req, res)=> {
try{
  let candidate = await candidates.find({organization_id:req.params.org_id,post:req.params.p_id}).populate('user').populate('post');
  let user= await users.countDocuments({organization:req.params.org_id,role:'voter'});
  return res.json({message:'ok',TotalUser:user,candidate});
}
catch{
  return res.json({message:'inavlid ID'});
}
});

// Results
router.get('/Result/:org_id/:p_id/:Auth_id', async(req, res)=> {
  if(req.params.Auth_id==1)
  {
  try{
  
    let candidate = await candidates.find({organization_id:req.params.org_id,post:req.params.p_id}).populate('user').populate('post');
    return res.json(candidate);
  }
  catch{
    return res.json({message:'inavlid ID'});
  }
}
  else{
    return res.json({message:'Authentication Error'});
  }
  });



// add candidate
router.post('/:org_id/:dep_id', upload.single('Symbol'),validatecandidates,async(req, res, next)=>
{ 

  var cand = await candidates.findOne({email: req.body.email});
  if(cand) return res.status(400).json({message:'candidate already exists'});
  var email = await users.findOne({email:req.body.email});
  if(!email) return res.status(400).json({message:'User with given email not present'});
  var myquery1 = await departments.findOne({_id : req.params.dep_id});
  if(!myquery1) return res.status(400).json({message:'department not exist'}); 
  var myquery = await departments.findOne({organization_id : req.params.org_id});
  if(!myquery) return res.status(400).json({message:'org not exist'}); 
    var post = await posts.findOne({name: req.body.post});
    if(!post) return res.status(400).json({message:'post with given name not present'});
 
    let candidate = new candidates();
    candidate.Name=req.body.Name
    candidate.email=req.body.email
    candidate.phone_no=req.body.phone_no
    candidate.post=post
    //candidate.Symbol= req.file.path
    //candidate.Symbol.ContentType=req.file.mimetype
    candidate.organization_id = req.params.org_id
    candidate.department_id = req.params.dep_id
   
    await candidate.save();
    return users.updateOne({email:req.body.email},{ role: 'candidate' }, function(err,success) {
      if (err){
        return res.status(400).json({message:"User Role not updated"});
      }
      else{
        return res.status(400).json({message:"User Role updated"});
      }
    });
  
    
});
// Delete Candidate

router.delete('/:id', async(req, res)=>
{   
    try{
      
    let user = await candidates.deleteOne( {_id: req.params.id});
    return res.json(user);
}
    catch(err){
    return res.status(400).json("invalid Email");
      }

});

module.exports = router;

// Submit Vote
router.put('/vote/:id', async(req, res)=>
{   
  
      try{
        const {email} = req.body;
      var Users = await candidates.findOne({_id :req.body.email});
      if (!Users) return res.status(400).json({ message: 'Candidate with Given Id does not exists' });
      var user = await users.findOne({_id:req.params.id})
      if(user.role!="voter")
      {
       return res.status(400).json({ message: 'you are not authorized' });
      }
      var status = await users.findOne({_id:req.params.id});  
       if(status.voteStatus!=false)
       {
        return res.status(400).json({ message: 'You have already given vote' });
       }

    
     candidates.updateOne( {_id:email}, { $inc: { votes: 1 }}, function(err,success) {
      if (err){
        return res.status(400).json({message:"unsuccessfull vote submission"});
      }
    });
    
   users.updateOne( {_id:req.params.id}, { voteStatus: true }, function(err,success) {
      if (err){
        return res.status(400).json({message:"unsuccessfull vote submission"});
      }
    });
      
         return res.json({message:" vote submitted successfully"});  
     
    
    
   // return res.send({ message:'Updation Successful'});
   
}
    catch(err){
    return res.status(400).json({ message:"Unsuccessfull attempt"});
      }

});