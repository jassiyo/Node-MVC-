const comment = require('../models/comment');
const post = require('../models/post');

module.exports.create = async function (req, res) {
    try {
        const foundPost = await post.findById(req.body.post);
        console.log(req.body)
        if (foundPost) {
            const createdComment = await comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });

            foundPost.comment.push(createdComment);
            await foundPost.save();

            res.redirect('/');
        }
    } catch (err) {
        // Handle error
        console.error(err);
        // You might want to send an error response here
    }
};
