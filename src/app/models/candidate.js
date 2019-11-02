const db = require('../database');
const bcrypt = require('bcryptjs');

const CandidateSchema = new db.Schema({
    name:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
    },
    password:{
        type:String,
        require:true,
        select:false,
    },

    birthday:{
        type:Date,
        require:false,
    },
    cpf:{
        type:Number,
        require:false,
    },
    universityName:{
        type:String,
        require:false,
    },
    courseName:{
        type:String,
        require:false,
    },
    conclusionDate:{
        type:Date,
        require:false,
    },
});

CandidateSchema.pre('save', async function(next){
    const hash = await bcrypt.hash(this.password, 5);
    this.password = hash;
    next();
})


const Candidate = db.model('Candidate',CandidateSchema);

module.exports = Candidate;