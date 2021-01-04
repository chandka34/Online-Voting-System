var mongoose = require("mongoose")
const joi = require('@hapi/joi');


var EventSchema= mongoose.Schema({
 
    name:String,
    SDate:String,
   EndDate:String
    
});
// Compile model from schema
var Events = mongoose.model("Event", EventSchema );


function validateEvents(data)
{
   const schema = joi.object(
      {
         name: joi.string().min(2).required(),
         SDate: joi.string().required(),
         EndDate: joi.string().required()
        
         
         });
      return schema.validate(data);
}



module.exports = Events;
module.exports.validate = validateEvents;
