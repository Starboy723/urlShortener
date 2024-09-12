const express=require("express")
const router=express.Router();
const {userLogin,userSignup}=require("../controllers/user");

router.route("/login")
       .get((req,res)=>
             {
                     if(req.cookies.uid) return res.render("login",{flag:true});
                     return res.render("login")
              })
       .post(userLogin);
router.route("/signup")
       .get((req,res)=>{
              if(req.cookies.uid) return res.render("signup",{flag:true});
              return res.render("signup");
       })
       .post(userSignup);

router.get("/logout",(req,res)=>{
       res.clearCookie("uid");
       return res.render("homepage");
})
module.exports=router;
