var mongoose = require("mongoose")
var bcrypt = require('bcryptjs')
var adminSchema= mongoose.Schema({
 
   Name: String,
   password: String,
   username:String

});

adminSchema.methods.generateHashedPassword = async function () {
    let salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
 };
// Compile model from schema
var admin = mongoose.model("admin", adminSchema );



module.exports = admin;
