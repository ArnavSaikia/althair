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
        
        const createdUser = new User({name , email , password});
        createdUser = await createdUser.save();

        if(createdUser){
            generateToken(res , User._id)
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

module.exports = registerUser;