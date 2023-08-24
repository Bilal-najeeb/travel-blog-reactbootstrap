import mongoose from 'mongoose'



const blogSchema = mongoose.Schema({

    author: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'},
    title: {type: String, required: true},
    summary: {type: String, required: true},
    content: {type: String, required: true},
    category: {type: String, required: true},
    blogImg: {type: String, required: true},

}, {
    timestamps: true,
})



const Blog = mongoose.model('Blog', blogSchema);

export default Blog;