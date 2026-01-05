const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const verifyToken = async (req) => {
        const token = req.cookies?.jwt;
        if (!token) return null;

        try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);

                const user = await User.findById(decoded.userId).select("-password");
                return user || null;

        } catch (err) {
                return null;
        }
};

module.exports = verifyToken;
