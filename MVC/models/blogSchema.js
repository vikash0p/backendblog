import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    des: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    tags: {
        type: [String],
        required: true
    },
    author: {
        type: String,
        required: true,

    }
},{
    timestamps: true
});

const Blog=mongoose.model("Blog", blogSchema);
export default Blog