const mongoose= require("mongoose");
const JWT= require("jsonwebtoken");

const userSchema= new mongoose.Schema({
    uname:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    gender:{
        type: String,
        required: true
    },
    profile:{
        type: String,
    }
}, {
    timestamps: true
});



// JWT generation code
userSchema.methods.generateToken= function(){
    try{
        return JWT.sign(
            {
                //payload
                id: this._id.toString(),
                name: this.name,
                email: this.email,
            },
                //signature
                process.env.PRIVATE_KEY,
            {                           
                //expires
                expiresIn: "1d"
            }
        )
    }catch(err){
        console.log(err);
    }
}

const User= new mongoose.model("User", userSchema);

module.exports= User;