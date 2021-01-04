var mongoose = require("mongoose")
const joi = require('@hapi/joi');
var bcrypt = require('bcryptjs');
const { boolean } = require("@hapi/joi");

var userSchema= mongoose.Schema({
 
   First_name: String,
   Last_name: String,
   email: String,
   phone_no: Number,
   password: String,
  
   organization:
   {
     
     type: mongoose.Schema.Types.ObjectId,
     ref: 'organizations',
     required: true
   },
   department:
       {
         
         type: mongoose.Schema.Types.ObjectId,
         ref: 'department',
         required: true
       },
     role: {
   
      type: String,
      default: "voter",
   },
   
   resetLink:{
      data: String,
      default: '',
   },
    voteStatus:{
         type:Boolean,
         default: false
    },
    ActivationStatus:{
      type:Boolean,
      default: false
 },
    ActivationCode:{
      data: String,
      default: '',
   },

  
});
userSchema.methods.generateHashedPassword = async function () {
   let salt = await bcrypt.genSalt(10);
   this.password = await bcrypt.hash(this.password, salt);
};
// Compile model from schema
var users = mongoose.model("users", userSchema );


function validateusers(data)
{
   const schema = joi.object(
      {
         First_name: joi.string().min(2).required(),
         Last_name: joi.string().min(1).required(),
         email: joi.string().email().required(),
         password: joi.string().min(8).max(15).required(),
         phone_no: joi.string().pattern(new RegExp('^((\\+92)|(0092))-{0,1}\\d{3}-{0,1}\\d{7}$|^\\d{11}$|^\d{4}-\d{7}$')).required(),
         organization_id: joi.string().required(),
         department_id: joi.string().required(),
         
      });
      return schema.validate(data); 
}

function validateUserLogin(data)
{
   const schema = joi.object(
      {
         
         email: joi.string().email().required(),
         password: joi.string().min(8).max(15).required(),
      
      });
      return schema.validate(data);
}
module.exports = users;
module.exports.validate = validateusers;
module.exports.validateUser = validateUserLogin;