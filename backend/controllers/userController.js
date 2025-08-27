const User = require('../models/userModel');
const generateToken = require('../utils/generateToken');
const verifyToken = require('../utils/verifyToken');

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


// a user logging out
const logoutUser = (req,res) => {
    try{
        res.cookie("jwt","",{
        httpOnly: true,
        expires: new Date(0)
        });
        res.status(200).json({message: "Successfully Logged Out"});
    }

    catch(err){
        res.status(500).json({message: err.message});
    }
};


// user details
const fetchUserDetails = async (req,res) => {
    try{
        const user = await verifyToken(req);
        res.status(200).json(user);
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
}


// update user details
const updateUserDetails = async (req , res) => {
    try{
        const userWithooutPassword = await verifyToken(req);
        const user = await User.findById(userWithooutPassword._id)
        if(user){
            const {name, email, password, oldPassword} = req.body;
            if(!oldPassword || !(await user.matchPassword(oldPassword))){
                return res.status(400).json({message: "Wrong Password Entered. Account Not Updated"});
            }

            if(name) user.name = name;
            if(email){
                if(await User.findOne({email}) !== user) return res.status(400).json({message: "This email is already registered with another account"})
                user.email = email;
            }
            if(password) user.password = password;

            //im not regenerating jwt here cuz jwt is storing only userId at the moment which will not change(i hope)
            await user.save();

            res.status(200).json({message: `User details successfully updated`});
        }
    }

    catch(err){
        console.log(err);
        res.status(500).json({message: err.message});
    }
}

module.exports = {registerUser , loginUser , logoutUser, fetchUserDetails, updateUserDetails};