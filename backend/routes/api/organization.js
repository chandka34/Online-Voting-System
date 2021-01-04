var express = require('express');
var router = express.Router();
const validateOrganiations = require('../../middlewares/validateOrganizations')
const auth = require('../../middlewares/auth');
const admin = require('../../middlewares/admin');
var users= require('../../models/user')
var organizations= require('../../models/organiztions')
/* GET organization listing. */

router.get('/:id', async(req, res)=> {
    console.log(req.users);
  let organization = await organizations.find({_id: req.params.id});
  return res.send(organization);
});




router.get('/', async(req, res)=> {
  let organization = await organizations.find();
  return res.send(organization);
});
// add organization
router.post('/',validateOrganiations , async(req, res)=>
{
    let org = await organizations.findOne({organization_id : req.body.organization_id});
    if (org) return res.status(400).json("organization with given id already exists");
    let organization = new organizations();
    organization.organization_id= req.body.organization_id;
    organization.organization_name= req.body.organization_name;
    await organization.save();
    return res.json({message:"Organization added successfully"});

});

// get single record
router.get('/:id', async(req, res)=>
{   
    try{
    let organization = await organizations.find( {_id: req.params.id});
    if(!organization) return res.status(400).json({ message:"id not present"});
    return res.json(organization);
}
    catch(err){
    return res.status(400).json({ message:"invalid id"});
      }

});


//delete organization

router.delete('/:id', async(req, res)=>
{   
    try{
      
    let user = await organizations.deleteOne( {_id: req.params.id});
    return res.json(user);
}
    catch(err){
    return res.status(400).json("invalid Email");
      }

});
      



module.exports = router;
