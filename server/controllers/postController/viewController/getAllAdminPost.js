const postModel = require("../../../models/postModel");

module.exports = async(req, res) => {
    try {
        const posts = await postModel.find({postedBy: req.id}).sort({createdAt: -1});

        if(!posts){
            return res.status(500).send({
                success: false,
                message: 'Admin Posts Not Found'
            });
        }

        res.status(200).send({
            success: true,
            message: 'All admin\'s posts have been fetched',
            posts
        });
    } catch (error) {
        console.log(`Error in get-all-admin-post api: ${error}`.bgRed.white);
        return res.status(500).send({
            success: false,
            message: 'Error in get-all-admin-post api',
            error
        });
    }
}