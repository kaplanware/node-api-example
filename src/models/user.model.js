const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
        name: {type: String, required:true},
        lastname: {type: String, required:true},
        email: {type: String, required:true},
        password: {type: String, required:true, max: 1024, min: 6}
    },
    {
        collation: {
            locale: 'en_US',
            strength: 1
        },
        timestamps: true
    })

const user = mongoose.model("users", userSchema)

module.exports = user;