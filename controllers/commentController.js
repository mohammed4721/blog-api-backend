//import model
const Comment = require("../models/commentModel");
const Post = require("../models/postModel");

exports.createComment = async (req, res) => {
    try {
        const { post, user, body } = req.body;
        const savedComment = await Comment.create({ post, user, body });


        //find the post ID, add new commentto its comment array
        const updatedPost = await Post.findByIdAndUpdate(post, { $push: { comments: savedComment._id } },
            { new: true })
            .populate("comments") // populate the comments array with comment documents
            .exec()
         return res.status(201).json({
            success: true,
            post: updatedPost
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
}


