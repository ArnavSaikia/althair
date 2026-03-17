const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const wardrobeItemSchema = new Schema(
    {
        clothing: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Clothing",
            required: true,
        },
    },
    {
        timestamps: true, // createdAt, updatedAt PER wardrobe entry
        _id: false
    }
);

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: false
    },

    googleId: {
        type: String,
        unique: true,
        sparse: true
    },

    wardrobe: [wardrobeItemSchema]
}, {timestamps: true});

userSchema.pre("save", async function (next) {
    if(!this.isModified('password')) return next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password , salt);
    next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
    if (!this.password) return false;
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = User;