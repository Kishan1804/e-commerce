const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    fullName: {
        type: String,
    },
    email: {
        type: String,
    },
    number: {
        type: String,
    },
    password: {
        type: String,
    },
    role: {
        type: String,
        default: "user",
        enum: ["admin", "user"],
    }
});



module.exports = mongoose.model('User', UserSchema);