const {validate} = require("../models/feedback")
function validatefeedbacks(req, res, next)
{
    let {error} = validate(req.body);
    if (error) return res.status(400).send({message:error.details[0].message});
    next();
}
module.exports = validatefeedbacks;

