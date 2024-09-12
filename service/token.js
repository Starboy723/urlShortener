const jwt=require("jsonwebtoken");
const secret="secure@@@";

function setUser(user){
    return jwt.sign({
        _id:user._id,
        username:user.username,
        password:user.password,
        role:user.role,
    },secret);
}
function getUser(token){
    return jwt.verify(token,secret);
}

module.exports={setUser,getUser};