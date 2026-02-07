const Post = require("../models/postModel");


exports.createPost = async (req, res) => {
    try {
        const { title, body } = req.body;
        const savedPost = await Post.create({ title, body });
        return res.status(201).json({
            success: true,
            post: savedPost
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        })
    }

}

exports.getAllPosts = async (req, res) =>{
    try{
        const posts = await Post.find().populate("comments").exec();
        return res.status(200).json({
            success: true,
            data: posts,
        })
    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message,
        })
    }
}