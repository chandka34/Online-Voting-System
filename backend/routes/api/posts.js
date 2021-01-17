var express = require('express');
var router = express.Router();
const validateposts = require('../../middlewares/validatepost')
var posts= require('../../models/posts')
var organizations=require('../../models/organiztions')



/* GET post listing. */
router.get('/:id/:Auth_id', async(req, res)=> {
  if(req.params.Auth_id==1)
  {
    try{
  let post = await posts.find({organization_id:req.params.id,EndDate: {$gte: new Date()}})
  return res.json(post);
    }
    
    catch{
      return res.json('Something Went Wrong Please Try Again');
    }
  }
    else{
      return res.json({message:'Authentication error'})
    }
});

// add post
router.post('/:id/:Auth_id',validateposts , async(req, res)=>
{   
  if(req.params.Auth_id==1)
  {
    try{
  var myquery = await organizations.findOne({_id : req.params.id});
    if(!myquery) return res.status(400).json('org not exist'); 
    let Post = await posts.findOne({name: req.body.name});
    if(Post) return res.status(400).json("post is already present");
         let post = new posts();
         post.name = req.body.name;
        post.SDate= req.body.SDate;
    post.EndDate=req.body.EndDate;
         post.organization_id = myquery;
    await post.save();
    return res.json(post);
    }
    catch{
               return res.json({message:'Somthing Went Wrong Please Try Again'})
    }
  }
  else{
    return res.json({message:'Authentication Error'})
  }
});

// get single record
router.get('/:id/:Auth_id', async(req, res)=>
{   
  if(req.params.Auth_id==1)
  {
    try{
    let post = await posts.findById(req.params.id);
    if(!post) return res.status(400).json("id not present");
    return res.json({message:'ok',post});
}
    catch(err){
    return res.status(400).json("invalid id");
      }
    }
    else{
      return res.json({message:'Authentication Error'})
    }
});
 
//delete post

router.delete('/:id/:Auth_id', async(req, res)=>
{   
  if(req.params.Auth_id==1)
  {
    try{
       
    let Posts = await posts.findByIdAndDelete( req.params.id);
    return res.json({message:'ok',Posts});
}
    catch(err){
    return res.status(400).json("invalid id");
      }
    }
    else{
      return res.json({message:'Authentication Error'})
    }
});

module.exports = router;
            