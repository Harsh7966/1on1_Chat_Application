
const user = require("../models/userModel");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

// Initialize multer storage in memory
const storage = multer.memoryStorage();

// Initialize multer instance
const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 } // Limit file size to 5MB
}).single('profile'); 

const Signup = (req, res) => {
    upload(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
            // A Multer error occurred when uploading.
            return res.status(400).json({ success: false, message: "Multer Error: " + err.message });
        } else if (err) {
            // An unknown error occurred when uploading.
            console.log(err);
            return res.status(500).json({ success: false, message: "Unknown Error: Failed to upload image" });
        }

        try {
            const { uname, email, password, gender } = req.body;

            const userExist = await user.findOne({ email: email });

            if (userExist) {
                return res.status(401).json({ message: "User Already Exist" });
            } else {
                const saltRound = 10;
                const hashPassword = await bcrypt.hash(password, saltRound);

                // Temporarily store the uploaded file data
                const file = req.file;

                // If a file was uploaded, handle its storage
                let profile = null;
                if (file) {
                    const filePath = path.join(__dirname, '../uploads/', Date.now() + '-' + file.originalname);
                    profile = '/uploads/' + path.basename(filePath);

                    // Save the user in the database
                    const register = await user.create({ uname, email, password: hashPassword, gender, profile });

                    if (register) {
                        // If user registration is successful, write the file to disk
                        fs.writeFileSync(filePath, file.buffer);

                        return res.status(200).json({
                            message: "Registration done",
                            jwt: await register.generateToken(),
                            user: register
                        });
                    } else {
                        // If user registration fails, ensure the file is not saved
                        return res.status(500).json({ success: false, message: "Server Error: Failed to register user" });
                    }
                }
            }
        } catch (err) {
            console.log(err);
            return res.status(500).json({ success: false, message: "Server Error" });
        }
    });
};

// Placeholder for Login and Logout
const Login = async (req, res) => {
    try {
        // Implement login logic
        const {email, password}= req.body;

        const userExist= await user.findOne({email: email});

        if(userExist){
            const comparePassword = await bcrypt.compare(password, userExist.password);
            if(comparePassword){
                res.status(200).json({
                    msg: "Login successful",
                    jwt: await userExist.generateToken(),
                    user: userExist
                });
            }else{
                res.status(400).json({msg: "Invalid password"});
            }
        }else{
            res.status(400).json({msg: "Invalid email"});
        }
    } catch (err) {
        console.log(err);
    }
}

const Logout = async (req, res) => {
    try {
        
    } catch (err) {
        console.log(err);
    }
}

const getUserDetails= async(req, res) =>{
    try{
        const data= req.userData;

        const details= await user.findOne({email: data.email});

        if(user){
            res.status(200).json(details);
        }else{
            res.status(400).json({msg: "User data not found"});
        }
    }catch(err){
        console.log(err);
    }
}

module.exports = {
    Login,
    Signup,
    Logout,
    getUserDetails
}
