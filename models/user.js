const mongoose = require('mongoose');

const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    username:{
        type:String,
        required: true,
        unique: true
    },
    contris:{
        type:Number,
        default:0
    }
})
userSchema.plugin(passportLocalMongoose);
const User = mongoose.model('User',userSchema);

module.exports = User;