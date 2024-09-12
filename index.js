const express=require("express");
const app=express();
const path=require("path")
const connectDb=require("./connection");
const {validateUser,restrictToOnly}=require("./middlewares/auth");
const cookieParser = require("cookie-parser");
const { getUser}=require("./service/token");
const PORT=2000;

app.use(express.static("public"));
app.set("view engine","ejs");
app.set("views",path.resolve("./views"));

//middlewares
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());

//requests
app.use("/url",validateUser,restrictToOnly(["ADMIN","NORMAL"]),require("./routes/url"));
app.use("/user",require("./routes/user"));
app.get("/",(req,res)=>{
    if(req.cookies.uid) {
    const user=getUser(req.cookies.uid);
   return res.render("homePage",{flag:user?.username});
    }
    return res.render("homepage")
})

//database connection
connectDb("mongodb://127.0.0.1:27017/restart").then((e)=>{console.log("database connected")}).catch((e)=>{console.log("error occurred")})


app.listen(PORT,()=>{console.log("server started")});