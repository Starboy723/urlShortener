const {getUser}=require("../service/token");
function validateUser(req,res,next){
    const cooky=req.cookies.uid;
    if(!cooky)return res.redirect("/user/login");
    const user=getUser(cooky);
    if(!user)return res.redirect("/user/login");
    req.user=user;
    next();
}
function restrictToOnly(roles=[]){
    return function (req,res,next){
        if(!req.user) return  res.redirect("/user/login");
        if(!roles.includes(req.user.role)) res.end("YOU ARE TRYING TO ACCESS RESTRICTED URL");
        return next();
    }
}

module.exports={validateUser,restrictToOnly};