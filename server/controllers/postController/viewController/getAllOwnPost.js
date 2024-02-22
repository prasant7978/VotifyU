const postModel = require("../../../models/postModel");

module.exports = async(req, res) => {
    try {
        const posts = await postModel.find({postedBy: req.id}).sort({createdAt: -1});

        res.status(200).send({
            success: true,
            message: 'All user\'s own posts have been fetched',
            posts
        });
    } catch (error) {
        console.log(`Error in get-all-own-post api: ${error}`.bgRed.white);
        return res.status(500).send({
            success: false,
            message: 'Error in get-all-own-post api',
            error
        });
    }
}