const mongoose = require('mongoose');
const {user,password} = require('./secret');

mongoose.connect(`mongodb+srv://${user}:${password}@cluster0-fxri8.mongodb.net/test?retryWrites=true&w=majority`,{useNewUrlParser: true , useUnifiedTopology: true});


module.exports = mongoose;