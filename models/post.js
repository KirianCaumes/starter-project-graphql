import mongoose from "mongoose"
const Schema = mongoose.Schema

let schema = new mongoose.Schema({
    _id: Number,
    title: String,
    content: String,
    authorId: String,
})

const Post = mongoose.model('Post', schema, 'post')

export default Post