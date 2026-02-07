const Like = require("../models/likeModel");
const Post = require("../models/postModel");

exports.likePost = async (req, res) => {
    try {
        const { post, user } = req.body;
        const savedLike = await Like.create({ post, user });

        const updatedPost = await Post.findByIdAndUpdate(post, { $push: { likes: savedLike._id } },
            { new: true })
            .populate("likes")
            .exec()


        res.json({
            success: true,
            post: updatedPost,
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        })

    }
}


exports.unlikePost = async (req, res) => {
    try {
        const { post, savedLike } = req.body;
        // noww find the like id and delete it 
        const deletedLike = await Like.findOneAndDelete({ post: post, _id: savedLike })

        // update the post collection

        const updatedPost = await Post.findByIdAndUpdate(post, { $pull: { likes: deletedLike._id } }, { new: true })
        res.json({
            post:updatedPost
        })
    } catch (err) {
        res.json({
            message: err.message,
        })
    }
}