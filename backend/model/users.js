const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema ({
    First_Name: {
        type: String,
        required: true
    },

    Last_Name: {
        type: String,
        required: true
    },

    Address: {
        type: String,
        required: false
    },

    Email: {
        type: String,
        required: false
    },

    Contact_Number: {
        type: String,
        required: false 
    }
});

const User = mongoose.model("User", UserSchema);
module.exports = {User};