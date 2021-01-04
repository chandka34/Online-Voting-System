var express = require('express');
var router = express.Router();
const validateposts = require('../../middlewares/validatepost')
var posts= require('../../models/posts')
var organizations=require('../../models/organiztions')



/* GET post listing. */
router.get('/:id', async(req, res)=> {
  let post = await posts.find({organization_id:req.params.id}).populate('organization')
  return res.json(post);
});
// add post
router.post('/:id',validateposts , async(req, res)=>
{   
  var myquery = await organizations.findOne({_id : req.params.id});
    if(!myquery) return res.status(400).json('org not exist'); 
    let Post = await posts.findOne({name: req.body.name});
    if(Post) return res.status(400).json("post is already present");
         let post = new posts();
         post.name = req.body.name;
         post.organization_id = myquery;
    await post.save();
    return res.json(post);

});

// get single record
router.get('/:id', async(req, res)=>
{   
    try{
    let post = await posts.findById(req.params.id);
    if(!post) return res.status(400).json("id not present");
    return res.json(post);
}
    catch(err){
    return res.status(400).json("invalid id");
      }

});
 
//delete post

router.delete('/:id', async(req, res)=>
{   
    try{
       
    let Posts = await posts.findByIdAndDelete( req.params.id);
    return res.json(Posts);
}
    catch(err){
    return res.status(400).json("invalid id");
      }

});

module.exports = router;
            