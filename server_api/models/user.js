const mongoose=require("mongoose");
const validator=require("validator");


const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,

    },
    
    email:{
        type:String,
        required:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value))
            {
                throw new Error("email is invalid");
            }
        },
    },
   
    password:{
        type:String,
        required:true,
        min:4,
        
    },
   profilePicture:{
    type:String,
    default:""
   },
   coverPicture:{
    type:String,
    default:""
   },
   followers:{
    type:Array,
    default:[]
   },
   followings:{
    type:Array,
    default:[]
   },
   isAdmin:{
    type:Boolean,
    default:false
   },
  desc:{
    type:String,
    max:50
  },
  city:{
    type:String,
    max:50
  },
  from:{
    type:String,
    max:50
  },
  relationship:{
    type:Number,
    enum:[1,2,3]
  },
},{timestamps:true});  


const User=new mongoose.model("User",userSchema);
module.exports=User;