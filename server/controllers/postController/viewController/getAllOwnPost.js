const postModel = require("../../../models/postModel");

module.exports = async(req, res) => {
    try {
        const posts = await postModel.find({postedBy: req.query.candidateId}).sort({createdAt: -1});

        if(!posts){
            return res.status(500).send({
                success: false,
                message: 'Candidate Posts Not Found'
            });
        }

        res.status(200).send({
            success: true,
            message: 'All candidate\'s own posts have been fetched',
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