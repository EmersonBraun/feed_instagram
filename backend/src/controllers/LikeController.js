const Post = require('../models/Post');

module.exports = {
    async store(req, res) {
        const post = await Post.findById(req.params.id)
        post.likes += 1

        try {
            await post.save()
            req.io.emit('like', post)           
        } catch (error) {
            console.error(error)
        }
        return res.json(post)
    }
}; 