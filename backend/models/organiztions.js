var mongoose = require("mongoose")
const joi = require('@hapi/joi');
var organizationSchema= mongoose.Schema({
   organization_id: String,
   organization_name: String
});
// Compile model from schema
var organizations = mongoose.model("organizations", organizationSchema );


function validateOrganizations(data)
{
   const schema = joi.object(
      {
         organization_name: joi.string().min(4).required(),
         organization_id: joi.string().min(0).required()
      });
      return schema.validate(data);
}
module.exports = organizations;
module.exports.validate = validateOrganizations;