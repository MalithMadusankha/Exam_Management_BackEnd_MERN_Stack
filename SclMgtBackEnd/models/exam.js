const mongoose = require('mongoose');
const schema = mongoose.Schema;
var Validator = require('jsonschema').Validator;
var v = new Validator();

const examSchema = new mongoose.Schema({

    examId:{
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    grade: {
        type: Number,
        required: true,
        positive: true,
        integer: true
    },
    subject:{
        type:String,
        
    },
    date: {
        type: Date,
        required: true,
    },
    timeStart: {
        type: String,
        required: true
    },
    timeEnd: {
        type: String,
        required: true
    },
    notice:{
        type:String,
        required: true
    },
    mark:[
        {
            stdID: {type:String},
            stdName: {type:String},
            mark:{
                type: Number,
                // required: true,
                // positive: true,
                // integer: true,
                
            }
        }
    ]
});

const Exam = mongoose.model("exam", examSchema);

module.exports = Exam;
