const mongoose=require("mongoose");
const urlSchema=new mongoose.Schema({
   shortID:{
    type:String,
    required:true,
   },
   redirectUrl:{
    type:String,
    required:true,
   },
   visitedHistory:[{time:{type:String}}],
   createdBy:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"users",
   }

});

const urlModel=mongoose.model("urls",urlSchema);

module.exports=urlModel;