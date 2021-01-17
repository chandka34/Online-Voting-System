var express = require('express');
var router = express.Router();
const validatefeedbacks = require('../../middlewares/validatefeedback')
var feedbacks= require('../../models/feedback')




/* GET feedbacks listing. */
router.get('/:Auth_id', async(req, res)=> {
  if(req.params.Auth_id==1)
  {
    try{
  let feedback = await feedbacks.find();
  return res.json(feedback);
    }
    catch{
      return res.json({message:'Something Went Wrong please try again'})
    }
  }
  else{
    return res.json({message:'Authentication Error'})
  }
});
// add feedback
router.post('/:Auth_id',validatefeedbacks , async(req, res)=>
{   
  if(req.params.Auth_id==1)
  {
    try{
         let Feed = new feedbacks();
         Feed.feedback = req.body.feedback  ;
    await Feed.save();
    return res.json({ message:'feeback submit successfully'});
    }
    catch(err){
      return res.status(400).json({message:"unsuccessful"});
        }
      }
      else
      {
        return res.json({message:'Authentication Error'})
      }
});

// get single record
router.get('/:id/:Auth_id', async(req, res)=>
{   
  if(req.params.Auth_id==1)
  {
    try{
    let feedback = await feedbacks.findById(req.params.id);
    if(!feedback) return res.status(400).json("id not present");
    return res.json({message:'ok',feedback});
}
    catch(err){ 
    return res.status(400).json("invalid id");
      }
    }
    else{
      return res.json({message:'Authentication Error'})
    }

});
 
//delete feedback

 
router.delete('/:id/:Auth_id', async(req, res)=>
{   
  if(req.params.Auth_id==1)
  {
    try{
      
    let user = await feedbacks.deleteOne( {_id: req.params.id});
    return res.json(user);
}
    catch(err){
    return res.status(400).json("invalid Id");
      }
    }
    else{
      return res.json({message:'Authentication Error'})
    }
});

module.exports = router;
            