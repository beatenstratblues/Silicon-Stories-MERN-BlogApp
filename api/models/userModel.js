const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username : {
        type: String,
        required: true,
        unique: true,
        min: 4,
    },
    password : {
        type: String,
        required: true,
        min: 8,
    },
});

const userModel = mongoose.model("user",UserSchema);

module.exports = { userModel };
