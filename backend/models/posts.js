var mongoose = require("mongoose")
const joi = require('@hapi/joi');

var postSchema= mongoose.Schema({
 
    name:String,
    SDate:Date,
   EndDate:Date,  
    organization_id:
    {
      
      type: mongoose.Schema.Types.ObjectId,
      ref: 'organization',
      required: true
    }
    
});
// Compile model from schema
var posts = mongoose.model("posts", postSchema );


function validateposts(data)
{
   const schema = joi.object(
      {
         name: joi.string().min(2).required(),
         SDate: joi.date().required(),
         EndDate: joi.date().required()
        
         
         });
      return schema.validate(data);
}



module.exports = posts;
module.exports.validate = validateposts;
