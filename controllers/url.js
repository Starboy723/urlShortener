const urlModel=require("../models/url");
const { ShortIdx }=require("npm-shortidx");
async function home(req,res){
    var urls=[]
    console.log(req.user);
    if(req.user){
    urls=await urlModel.find({createdBy:req.user?._id});
    }
    if(req.cookies.uid) return res.render("url",{flag:req.user.username});
    return res.render("url");
}
async function createUrl(req,res){
    const body=req.body;
    const shortId=ShortIdx();
    const result=await urlModel.create({
        shortID:shortId,
        redirectUrl:body.url,
        visitedhistory:[],
        createdBy:req.user?._id,
    });
    if(!req.cookies.uid)return  res.render("url",{rurl:shortId});
   return res.render("url",{rurl:shortId,flag:req.user.username});
}
async function stats(req,res){
    const urls=await urlModel.find({createdBy:req.user._id});
    if(!req.cookies.uid)return res.render("stats",{urls:urls});
    return res.render("stats",{urls:urls,flag:req.user.username})

}

async function redirectTO(req,res){
          const {id}=req.params;
          let date=new Date();
          date=date.toString().substring(0,25);
          const result=await urlModel.findOneAndUpdate({shortID:id},{$push:{visitedHistory:{time:date}}});
          return res.redirect(result.redirectUrl);

}
async function urlStats(req,res){
    const url=req.params.url;
    const stats=await urlModel.findOne({shortID:url});
   if(!stats) return res.render("urlStats",{error:"YOU ARE TRYING TO CHECK INVALID URL STATISTICS"});
   if(req.cookies.uid) return res.render("urlStats",{stats:stats,flag:req.user.username})
    return res.render("urlStats",{stats:stats});
}

module.exports={createUrl,redirectTO,home,stats,urlStats};