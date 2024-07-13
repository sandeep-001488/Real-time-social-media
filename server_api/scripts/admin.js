const express=require("express")
const User=require("../models/user")
const bcrypt=require("bcrypt")


async function createAdminAccount(){
  try {
    const admin=await User.findOne({email:"sandeep12@gmail.com"})
   
  if(!admin){
    const salt=await bcrypt.genSalt(10)
    const hashedPassword=await bcrypt.hash("admin",salt)
    const newUser=new User({
      username:"SandeepSanu",
      email:"sandeep12@gmail.com",
      password:hashedPassword,
      isAdmin:true,
      profilePicture:"my_pic2.jpg",
      coverPicture:"tejas.jpg",
      desc:"Hello ones! Admin here",
      city:"Jamui",
      from:"Garhi",
      relationship:1

    })
    await newUser.save()
    console.log("account created for admin");
  }else {
    console.log("admin already exist");
  }
  } catch (error) {
     console.log("error during creatng admin account",error);
  }

}

module.exports={createAdminAccount}