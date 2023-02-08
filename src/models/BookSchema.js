const mongoose = require("mongoose");

mongoose.set('strictQuery', true)

const bookSchema = new mongoose.Schema( {
    name: {type: String, required:true},
    author: {type: String, required:true},
    description: String
})

module.exports = mongoose.model('Book', bookSchema);