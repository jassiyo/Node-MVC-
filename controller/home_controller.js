const post = require('../models/post');

module.exports.home = async function(req, res) {
    try {
        const posts = await (await post.find({})
        .populate('user')
        .populate({
            path:'comment',
            populate:{
                path: 'user'
            }
        })
        );
        return res.render('home', {
            title: 'Codieal | Home',
            post: posts
        });
    } catch (err) {
        console.log('error in fetching posts:', err);
    }
};

