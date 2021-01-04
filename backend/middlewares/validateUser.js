const {validate} = require("../models/user")
function validateusers(req, res, next)
{
    let {error} = validate(req.body);
    if (error) return res.status(400).send({message:error.details[0].message});
    next();
}
module.exports = validateusers;