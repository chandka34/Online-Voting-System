var mongoose = require("mongoose")
const joi = require('@hapi/joi');

var postSchema= mongoose.Schema({
 
    name:String,
    organization_id:
    {
      
      type: mongoose.Schema.Types.ObjectId,
      ref: 'organization_id',
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
         
         });
      return schema.validate(data);
}



module.exports = posts;
module.exports.validate = validateposts;
