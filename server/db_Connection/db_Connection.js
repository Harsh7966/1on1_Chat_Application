const mongoose= require("mongoose");

const ConnectDB= () =>{
    try{
        const done= mongoose.connect(process.env.MongoDB_Connection_String);

        if(done){
            console.log("MongoDB Connected");
        }else{
            console.log("MongoDB Connection Fail");
        }
    }catch(err){
        console.log(err)
    }
}

module.exports= ConnectDB;