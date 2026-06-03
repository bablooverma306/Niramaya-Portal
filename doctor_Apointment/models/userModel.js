import mongoose from "mongoose";
 const userSchema = new mongoose.Schema({
 name : {type : String, required :[true ,'name  is equired']},
  password : {type : String, required :[true ,'password  is equired']},
   email : {type : String, required :[true ,'email  is equired'],unique:true},
   Image : { type:String },
   phone : {type: String},
   address : {type:String },
   dob : {type:String },
   gender : {type:String },
isAdmin : {type:Boolean, default:false },

 },{timestamps:true})

 const userModel = mongoose.model('user', userSchema);

 export default userModel;