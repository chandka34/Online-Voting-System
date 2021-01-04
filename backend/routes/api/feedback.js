var express = require('express');
var router = express.Router();
const validatefeedbacks = require('../../middlewares/validatefeedback')
var feedbacks= require('../../models/feedback')




/* GET feedbacks listing. */
router.get('/', async(req, res)=> {
  let feedback = await feedbacks.find();
  return res.json(feedback);
});
// add feedback
router.post('/',validatefeedbacks , async(req, res)=>
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
});

// get single record
router.get('/:id', async(req, res)=>
{   
    try{
    let feedback = await feedbacks.findById(req.params.id);
    if(!feedback) return res.status(400).json("id not present");
    return res.json(feedback);
}
    catch(err){ 
    return res.status(400).json("invalid id");
      }

});
 
//delete feedback

 
router.delete('/:id', async(req, res)=>
{   
    try{
      
    let user = await feedbacks.deleteOne( {_id: req.params.id});
    return res.json(user);
}
    catch(err){
    return res.status(400).json("invalid Id");
      }

});

module.exports = router;
            