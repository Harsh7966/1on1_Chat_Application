const User= require("../models/userModel");

const getAllUser= async(req, res) =>{
    try{
        const loginUser= req.userId;

        if(loginUser){
            const getAllUser= await User.find({_id: {$ne: loginUser}}).select("-password");
            res.status(200).json(getAllUser);
        }else{
            res.status(400).json({msg: "Users data not found"});
            console.log("Users data not found");
        }
    }catch(err){
        console.log(err);
    }
}

module.exports={
    getAllUser
}