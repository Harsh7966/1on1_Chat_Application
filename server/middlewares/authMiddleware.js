const JWT= require("jsonwebtoken");
const User= require("../models/userModel");

const userAuthentication= async(req, res, next)=>{
    const token= req.header("Authorization");

    try{
        if(!token){
            console.log("JWT not found");
            res.status(404).json({msg: "JWT not found"});
        }else{
            const jwtToken= token.replace("Bearer", " ").trim();

            try {
                const jwtVerify = JWT.verify(jwtToken, process.env.PRIVATE_KEY);
                if (jwtVerify) {
                    const userData= await User.findOne({email: jwtVerify.email});

                    req.userId= userData._id.toString();
                    req.userData= userData;

                    next();
                } else {
                    console.log("Invalid Token!");
                    return res.status(401).json({ msg: "Invalid Token" });
                }
            } catch (err) {
                console.log(err);
                return res.status(500).json({ msg: "Internal Server Error " });
            }
        }
    }catch(err){
        console.log("Error", err);
    }
}

module.exports= userAuthentication;