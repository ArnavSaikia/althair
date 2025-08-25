const User = require('../models/userModel');
const generateToken = require('../utils/generateToken');

// a user regestering to make an account
const registerUser = async (req , res) => {
    const {name , email , password} = req.body;

    try {
        const anyExisting = await User.findOne({email});
        if(anyExisting){
            res.status(400).json({message: "Email is already associated with an account"})
        }
        
        let createdUser = new User({name , email , password});
        createdUser = await createdUser.save();

        if(createdUser){
            generateToken(res , createdUser._id)
            res.status(201).json({
                message: "Successfully Registered"
            })
        }
        else{
            res.status(500).json({message: "Some error occured in registering the user in the database"});
        }

    }
    catch(err){
        res.status(500).json({message: err.message});
    }
}

// a user logging in
const loginUser = async (req,res) => {
    const {email , password} = req.body;

    try{
        const user = await User.findOne({email})

        if (!user) res.status(400).json({message: "No account found with following email"});
        
        if (user && (await user.matchPassword(password))){
            generateToken(res , user._id);
            res.status(201).json({message: "Successfully Logged In"});
        }

        else{
            res.status(400).json({message: "Wrong password"})
        }
    }

    catch(err){
        res.status(500).json({message: err.message});
    }
}

module.exports = {registerUser , loginUser};