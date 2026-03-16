const mongoose = require('mongoose');

// Schema
const userSchema = new mongoose.Schema({
    fisrtName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,// const { type } = require('os');
        required: false,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    jobTitle: {
        type: String,
    },
    gender: {
        type: String,
    },
},
{timestamps: true}
)

const User = mongoose.model("user", userSchema);

module.exports = User;