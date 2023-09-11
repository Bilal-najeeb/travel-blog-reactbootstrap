import mongoose from 'mongoose'



const blogSchema = mongoose.Schema({

    author: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'},
    title: {type: String, required: true},
    summary: {type: String, required: true},
    content: {type: String, required: true},
    category: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
    blogImg: {type: String, required: true},
    location: {type: mongoose.Schema.Types.ObjectId, ref: 'SubLocation'},

}, {
    timestamps: true,
})



const Blog = mongoose.model('Blog', blogSchema);

export default Blog;