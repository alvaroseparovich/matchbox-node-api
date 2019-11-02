const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://user:user1@cluster0-fxri8.mongodb.net/test?retryWrites=true&w=majority',{useNewUrlParser: true , useUnifiedTopology: true});


module.exports = mongoose;