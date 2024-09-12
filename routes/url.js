const express=require("express");
const urlModel=require("../models/url");
const {createUrl,redirectTO,home,stats,urlStats}=require("../controllers/url");
const { restrictToOnly } = require("../middlewares/auth");
const router=express.Router();
router.route("/")
      .get(home)
     .post(createUrl);
router.get("/id/:id",redirectTO)
router.get("/stats",stats)
router.get("/stats/:url",urlStats);

router.get("/allurls",restrictToOnly(["ADMIN"]),async (req,res)=>{
   const urls=await urlModel.find({});
   return res.render("urls",{urls:urls});
})

module.exports=router;
