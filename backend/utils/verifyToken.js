const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const verifyToken = async (req) => {
        const token = req.cookies.jwt;

        if(!token) return res.status(400).json({message: "No token found in the request"});

        const decoded = jwt.verify(token , process.env.JWT_SECRET);

        const user = await User.findById(decoded.userId).select("-password");

        if (user) return user;
        else return null;
}

module.exports = verifyToken;
