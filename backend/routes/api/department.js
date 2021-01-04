var express = require('express');
var router = express.Router();
const validatedepartments = require('../../middlewares/validateDepartment')
var departments= require('../../models/departments')
var organizations = require('../../models/organiztions');

// get all departments w.r.t organization
router.get('/:id', async(req, res)=> {
  let department = await departments.find({organization_id:req.params.id})
  return res.json(department);
});
// add department
router.post('/:id',validatedepartments , async(req, res)=>
{   
    var myquery = await organizations.findOne({_id : req.params.id});
    if(!myquery) return res.status(400).json('org not exist'); 
     var dep = await departments.findOne({department_id: req.body.department_id});
       if(dep) return res.status(400).json('department with given id already exists')
         let department = new departments;
    department.department_id= req.body.department_id;
    department.department_name= req.body.department_name;
    department.organization_id = myquery;
    await department.save();
    return res.json(department);

});

// get single record
router.get('/:id', async(req, res)=>
{   
    try{
    let department = await departments.find( {department_id: req.params.id});
    if(!department) return res.status(400).json("id not present");
    return res.json(department);
}
    catch(err){
    return res.status(400).json("invalid id");
      }

}); 
//delete department

router.delete('/:id', async(req, res)=>
{   
    try{
        let dep = await departments.findByIdAndDelete( req.params.id)
    return res.json(dep);
}
    catch(err){
    return res.status(400).json("invalid ID");
      }

});
     

module.exports = router;
            