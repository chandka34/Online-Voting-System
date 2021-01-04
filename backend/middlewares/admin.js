var users= require('./../models/user')
function admin(req, res, next){
    if(users.role="candidate") 
    return res.status(403).send({message:"you are not authorized"});
    next();
}
module.exports= admin;    