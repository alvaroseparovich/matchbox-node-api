const db = require('../database');
const bcrypt = require('bcryptjs');

const CandidateSchema = new db.Schema({
    name:{
        type:String,
        required:[true,'A name is required'],
    },
    email:{
        type:String,
        required:[true,'A email is required'],
    },
    password:{
        type:String,
        required:[true,'A password is required'],
        select:false,
    },

    birthday:{
        type:Date,
        required:false,
    },
    cpf:{
        type:Number,
        required:false,
    },
    universityName:{
        type:String,
        required:false,
    },
    courseName:{
        type:String,
        required:false,
    },
    conclusionDate:{
        type:Date,
        required:false,
    },
});

CandidateSchema.pre('save', async function(next){
    const hash = await bcrypt.hash(this.password, 5);
    this.password = hash;
    next();
})

const Candidate = db.model('Candidate',CandidateSchema);

module.exports = Candidate;