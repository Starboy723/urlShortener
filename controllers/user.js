const userModel=require("../models/user");
const {setUser}=require("../service/token");


async function userLogin(req,res){
    const {email,password}=req.body;
    const user=await userModel.findOne({email,password});
    if(!user)return res.render("login",{error:"invalid user"});
    const token=setUser(user);
    res.cookie("uid",token);
    return res.redirect("http://localhost:2000/url");
}
async function  userSignup(req,res){
     const user=await userModel.create({
        username:req.body.username,
        email:req.body.email,
        password:req.body.password,
     });
     return res.redirect("/user/login");
}


module.exports={userLogin,userSignup};

