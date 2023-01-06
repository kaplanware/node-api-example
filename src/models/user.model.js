const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 50
    },
    lastname:{
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 100,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 100
    }
},{
    collation: "users",
    timestamps: true
});

const user = mongoose.model("users", userSchema)

module.exports = user;