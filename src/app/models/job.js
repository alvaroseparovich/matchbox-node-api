const db = require('../database');

const JobSchema = new db.Schema({
    name:{
        type:String,
        require:true,
    },
    description:{
        type:String,
        require:true,
    },
    limitDate:{
        type:Date,
        require:true,
    },
    vacancies:{
        type:Number,
        require:true,
    },
});

const Job = db.model('Job',JobSchema);

module.exports = Job;