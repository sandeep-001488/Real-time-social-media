const router=require("express").Router()
const User=require("../models/user")
const bcrypt=require("bcrypt")

//update user 
router.put("/:id",async(req,res)=>{
   if(req.body.userId===req.params.id|| req.body.isAdmin){
      if(req.body.password){
        try {
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(req.body.password, salt);
          req.body.password = hashedPassword;
        } catch (error) {
          return res.status(500).json(error)
        }
      }
      try {
        const user=await User.findByIdAndUpdate(req.params.id,{
          $set:req.body,
          new:true
        })
        res.status(201).json({message:"account updated succesfully"})
        
      } catch (error) {
        return res.status(500).json(error)
      }
   } else{
    res.status(403).json({message:"You can update only your account"})
   }
})

// delete user 

router.delete("/:id",async(req,res)=>{
  if(req.body.userId===req.params.id|| req.body.isAdmin){
    
     try {
       const user=await User.findByIdAndDelete(req.params.id)
       res.status(201).json({message:"account deleted  succesfully"})
       
     } catch (error) {
       return res.status(500).json(error)
     }
  } else{
   res.status(403).json({message:"You can delete only your account"})
  }
})

// get a user 
router.get("/",async(req,res)=>{
  const userId=req.query.userId
  const username=req.query.username
     try {
        const user= userId ? await User.findById(userId) : await User.findOne({username:username})
       //for not getting specific part let it be "password","created at", "updated at"
       const {password,updatedAt,createdAt,...others}=user._doc
       res.status(201).json(others)
       
     } catch (error) {
       return res.status(500).json(error)
     }
  })

  //follow a user 
  router.put("/:id/follow",async(req,res)=>{
    if(req.body.userId!==req.params.id){
      try {
        const userToUnfollow=await User.findById(req.params.id)
        const currentUser=await User.findById(req.body.userId)
        if(!userToUnfollow.followers.includes(req.body.userId)){
          await userToUnfollow.updateOne({$push:{followers:req.body.userId}})

          await currentUser.updateOne({$push:{followings:req.body.userId}})
          res.status(201).json({message:"user has been followed"})
        } else {
          res.status(403).json({message:"u already follow this user"})
        }
        
      } catch (error) {
        res.status(500).json(error)
      }
    } else {
      res.status(403).json({message:"u caan't follow urself"})
    }
      
  })

  // unfolllow a user 

  router.put("/:id/unfollow",async(req,res)=>{
    if(req.body.userId!==req.params.id){
      try {
        const userToUnfollow=await User.findById(req.params.id)
        const currentUser=await User.findById(req.body.userId)
        if(userToUnfollow.followers.includes(req.body.userId)){
          await userToUnfollow.updateOne({$pull:{followers:req.body.userId}})

          await currentUser.updateOne({$pull:{followings:req.body.userId}})
          res.status(201).json({message:"user has been unfollowed"})
        } else {
          res.status(403).json({message:"u don't  follow this user"})
        }
        
      } catch (error) {
        res.status(500).json(error)
      }
    } else {
      res.status(403).json({message:"u caan't unfollow urself"})
    }
      
  })


module.exports=router