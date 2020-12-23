const mongoose = require('mongoose');
// const { model } = require('../../express mongoose/models/product');



const eventSchema = mongoose.Schema({
    title: {
        type:String,
        required :true
    },
    description : {
        type:String,
        required :true
    },
    tag : {
        
        type:[String],
        required :true
    },
    link : {
        type:String,    
        required :true
    },
    posterUrl : {
        type:String,
        required :true
    },
    start_date : {
        type: Date,
        required :true
    },
    start_time : {
        type: String,
        required :true
    },
    end_date :{
        type: Date,
        min: Date.now,
        required :true
    },
    end_time :{
        type: String,
        required :true
    },
    date_added : { 
        type : Date, 
        default: Date.now 
    },
    allowed:{
        type: Boolean,
        required :true
    },
    contributor:{
        type: String,
        required: true
    }
}); 

const Event = mongoose.model('Event',eventSchema);


module.exports = Event;