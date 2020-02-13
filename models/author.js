import mongoose from "mongoose"

let schema = new mongoose.Schema({
    _id: String,
    name: String,
    email: String,
})

const Author = mongoose.model('Author', schema, 'author')

export default Author