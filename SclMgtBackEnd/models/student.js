const mongoose = require('mongoose');

const schema = mongoose.Schema;

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age:{
        type:Number,
        required: true
    },
    gender: {
        type: String,
        required: true
    }
})

const Student = mongoose.model("student", studentSchema);

module.exports = Student;
