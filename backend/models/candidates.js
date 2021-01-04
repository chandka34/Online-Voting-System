var mongoose = require("mongoose")
const joi = require('@hapi/joi');
const { number } = require("@hapi/joi");
const { urlencoded } = require("body-parser");

const url = require('url')

var candidateSchema= mongoose.Schema({
  
  Name: String,
  email: String,
  phone_no: Number,
  Symbol: { 
    type: String,
     default:'uploads\symbol.png'
    },
      post:
      {
        
        type: mongoose.Schema.Types.ObjectId,
        ref: 'posts',
        required: true
      },
      organization_id:
      {
        
        type: mongoose.Schema.Types.ObjectId,
        ref: 'organizations',
        required: true
      },
       department_id:
       {
         
         type: mongoose.Schema.Types.ObjectId,
         ref: 'department',
       
       },
       votes:{
        type:Number,
        default: 0,
     },
    
}); 
 
// Compile model from schema
var candidates = mongoose.model("candidates", candidateSchema );


function validatecandidates(data)
{
   const schema = joi.object(
      {
        
        Name: joi.string().min(1).required(),
        email: joi.string().email().required(),
        phone_no: joi.string().pattern(new RegExp('^((\\+92)|(0092))-{0,1}\\d{3}-{0,1}\\d{7}$|^\\d{11}$|^\d{4}-\d{7}$')).required(),
         post: joi.string().required(),
         department_id: joi.string()
         
         //electrol_symbol: joi.required()

         
      });
      return schema.validate(data);
}



module.exports = candidates;
module.exports.validate = validatecandidates;
