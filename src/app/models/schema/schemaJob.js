const db = require('../../database');

const JobSchema = new db.Schema({
    name:{
        type:String,
        required:[true,'A name is required'],
    },
    description:{
        type:String,
        required:[true,'A description is required'],
    },
    limitDate:{
        type:Date,
        required:[true,'A limitDate is required'],
    },
    vacancies:{
        type:Number,
        required:false,
    },
});

const Job = db.model('Job',JobSchema);

module.exports = Job;