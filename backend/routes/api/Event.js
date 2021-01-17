var express = require('express');
var router = express.Router();
const validateEvents = require('../../middlewares/ValidateEvent')
var Events= require('../../models/Event')




/* GET Event listing. */
router.get('/:Auth_id', async(req, res)=> 
{
  if(req.params.Auth_id==1)
  {
    try{
  let Event = await Events.find();
  return res.json(Event);
    }
    catch{
      return res.json({message:'Invalid Id'})
    }
  }
  else{
    return res.json({message:'Authentication Error'})
  }
});
// add Event
router.post('/:Auth_id',validateEvents , async(req, res)=>
{   
  if(req.params.Auth_id==1)
  {
    try{
    let event = await Events.findOne({name:req.body.name});
    if(event) return res.status(400).json("Event Already present");
         let Event = new Events();
         Event.name = req.body.name;
         Event.SDate= req.body.SDate;
         Event.EndDate=req.body.EndDate;
    await Event.save();
    return res.send(Event);
    }
    catch{
      return res.json({message:'Something Went wrong'})
    }
  }
    else{
       return res.json({message:'Authentication Error'})
    }
});

// get single record
router.get('/:name/:Auth_id', async(req, res)=>
{   
  if(req.params.Auth_id==1)
  {
    try{
    let Event = await Events.findOne({name:req.params.name});
    if(!Event) return res.status(400).json("Event not present");
    console.log(Event)
    return res.json(Event);
}
    catch(err){
    return res.status(400).json("invalid name");
      }
    }
    else{
      return res.json({message:'Authentication error'})
    }
});
 
//delete event
router.delete('/:id/:Auth_id', async(req, res)=>
{   
  if(req.params.Auth_id==1)
  {
    try{
      
    let user = await Events.deleteOne( {_id: req.params.id});
    return res.json(user);
}
    catch(err){
    return res.status(400).json("invalid Email");
      }
    }
    else{
      return res.json({message:'Authentication Error'})
    }
});

router.put("/:id/:Auth_id", validateEvents, async (req, res) => {
  if(req.params.Auth_id==1)
  {
    try{
    let Event = await Events.findById(req.params.id);
    let event = await Events.findOne({name:req.body.name});
    if(event) return res.status(400).json({message:"Event Already present"});
    Event.name = req.body.name;
    Event.SDate= req.body.SDate;
    Event.EndDate=req.body.EndDate;
    await Event.save();
    return res.send({message:'ok',Event});
    }
    catch{
      return res.json({message:'Something Went Wrong Please try again'})
    }
  }
  else{
    return res.json({message:'Authentication Error'})
  }
  });
module.exports = router;
            