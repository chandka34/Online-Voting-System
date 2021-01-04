var express = require('express');
var router = express.Router();
const validateEvents = require('../../middlewares/ValidateEvent')
var Events= require('../../models/Event')




/* GET Event listing. */
router.get('/', async(req, res)=> {
  let Event = await Events.find();
  return res.json(Event);
});
// add Event
router.post('/',validateEvents , async(req, res)=>
{   
    let event = await Events.findOne({name:req.body.name});
    if(event) return res.status(400).json("Event Already present");
         let Event = new Events();
         Event.name = req.body.name;
         Event.SDate= req.body.SDate;
         Event.EndDate=req.body.EndDate;
    await Event.save();
    return res.send(Event);

});

// get single record
router.get('/:name', async(req, res)=>
{   
    try{
    let Event = await Events.findOne({name:req.params.name});
    if(!Event) return res.status(400).json("Event not present");
    return res.json(Event);
}
    catch(err){
    return res.status(400).json("invalid name");
      }

});
 
//delete event
router.delete('/:id', async(req, res)=>
{   
    try{
      
    let user = await Events.deleteOne( {_id: req.params.id});
    return res.json(user);
}
    catch(err){
    return res.status(400).json("invalid Email");
      }

});

router.put("/:id", validateEvents, async (req, res) => {
    let Event = await Events.findById(req.params.id);
    let event = await Events.findOne({name:req.body.name});
    if(event) return res.status(400).json("Event Already present");
    Event.name = req.body.name;
    Event.SDate= req.body.SDate;
    Event.EndDate=req.body.EndDate;
    await Event.save();
    return res.send(Event);
  });
module.exports = router;
            