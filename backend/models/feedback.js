var mongoose = require("mongoose")
const joi = require('@hapi/joi');

var feedbackSchema= mongoose.Schema({
 
    feedback:String
    
});
// Compile model from schema
var feedbacks = mongoose.model("feedbacks", feedbackSchema );


function validatefeedbacks(data)
{
   const schema = joi.object(
      {
         feedback: joi.string().min(50).required(),
         
         });
      return schema.validate(data);
}



module.exports = feedbacks;
module.exports.validate = validatefeedbacks;
