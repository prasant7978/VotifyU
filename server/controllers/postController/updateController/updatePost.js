const postModel = require("../../../models/postModel");

module.exports = async(req, res) => {
    try {
        const {description} = req.body;

        // validation
        if(!description){
            return res.status(500).send({
                success: false,
                message: 'Provide some description about the post'
            });
        }

        const post = await postModel.findById({_id: req.query.id});

        const updatedPost = await postModel.findByIdAndUpdate({_id: req.query.id}, {
            description: description || post?.description
        }, {new: true});

        res.status(200).send({
            success: true,
            message: 'Your post has been updated successfully',
            updatedPost
        });
    } catch (error) {
        console.log(`Error in update-post api: ${error}`.bgRed.white);
        return res.status(500).send({
            success: false,
            message: 'Error in update-post api',
            error
        });
    }
}