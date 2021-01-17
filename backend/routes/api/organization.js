var express = require('express');
var router = express.Router();
const validateOrganiations = require('../../middlewares/validateOrganizations')
const auth = require('../../middlewares/auth');
const admin = require('../../middlewares/admin');
var users= require('../../models/user')
var organizations= require('../../models/organiztions')
/* GET organization listing. */

router.get('/:id/:Auth_id', async(req, res)=> {
  if(req.params.Auth_id==1)
  {
    try{
  let organization = await organizations.find({_id: req.params.id});
  return res.send({message:'ok',organization});
    }
    catch{
      return res.json({message:'Something Went Wrong Please try again'})
    }
  }
  else{
    return res.json({message:'Authentication Error'})
  }
});




router.get('/:Auth_id', async(req, res)=> {
  if(req.params.Auth_id==1)
  {
    try{
  let organization = await organizations.find();
  return res.send(organization);
    }
    catch{
      return res.json({message:'Something went wrong Please try again'})
    }
  }
  else{
    return res.jso({message:'Authentication Erro'})
  }
});
// add organization
router.post('/:Auth_id',validateOrganiations , async(req, res)=>
{
  if(req.params.Auth_id==1)
  {
    try{
    let org = await organizations.findOne({organization_id : req.body.organization_id});
    if (org) return res.status(400).json("organization with given id already exists");
    let organization = new organizations();
    organization.organization_id= req.body.organization_id;
    organization.organization_name= req.body.organization_name;
    await organization.save();
    return res.json({message:"Organization added successfully"});
    }
    catch{
      return res.json({message:'Something Went Wrong Please try again'})
    }
  }
  else{
    return res.json({message:'Authentication Error'})
  }
});

// get single record
router.get('/:id/:Auth_id', async(req, res)=>
{   
  if(req.params.Auth_id==1)
  {
    try{
    let organization = await organizations.find( {_id: req.params.id});
    if(!organization) return res.status(400).json({ message:"id not present"});
    return res.json({message:'ok',organization});
}
    catch(err){
    return res.status(400).json({ message:"invalid id"});
      }
    }
    else{
      return res.json({message:'Authentication Error'})
    }
});


//delete organization

router.delete('/:id/:Auth_id', async(req, res)=>
{   
  if(req.params.Auth_id==1)
  {
    try{
      
    let user = await organizations.deleteOne( {_id: req.params.id});
    return res.json({message:'ok',user});
}
    catch(err){
    return res.status(400).json("invalid Email");
      }
    }
    else{
      return res.json({message:'Authentication Error'})
    }
});
      



module.exports = router;
