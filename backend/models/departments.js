var mongoose = require("mongoose")
const joi = require('@hapi/joi');
var departmentSchema= mongoose.Schema({
   department_id: String,
   department_name: String,
   organization_id:
       {
         
         type: mongoose.Schema.Types.ObjectId,
         ref: 'organizations',
         required: true
       }
  
});
// Compile model from schema
var department = mongoose.model("department", departmentSchema );


function validatedepartments(data)
{
   const schema = joi.object(
      {
         department_name: joi.string().min(4).required(),
         department_id: joi.string().min(4).required(),
         organization_id: joi.string()
     

      });
      return schema.validate(data);
}
module.exports = department;
module.exports.validate = validatedepartments;