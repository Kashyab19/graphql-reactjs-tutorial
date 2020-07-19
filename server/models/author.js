const mongoose = require('mongoose');
const Schema = mongoose.Schema

const authorSchema = new Schema({
    name :String,
    age:Number,
    country : String
    
})

//Model name is Author
module.exports = mongoose.model('Author',authorSchema)