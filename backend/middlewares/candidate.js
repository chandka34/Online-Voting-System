
var users= require('./../models/user')
function candidate(req, res, next){
    if(req.users.role="candidate") 
    return res.status(403).send({message:"you are not authorized"});
    next();
}
module.exports= candidate;    