const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema ({
    student_name : {
        type: String,
        required: true
    },
    father_name : {
        type: String,
        required: true
    },
    dob : {
        type: String,
        required: true
    },
    address : String,
    city : String,
    state : String,
    pin : Number,
    phone_number : {
        type : Number,
        required : true
        
    },
    email : {
        type : String,
        trim : true,
        lowercase : true,
        unique : true,
        required : true
    },
    class_opted :{
        type : Number,
        required : true
    },
    marks : Number,
    date_enrolled : String
})

module.exports = mongoose.model('User', UserSchema)