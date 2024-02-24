const postModel = require("../../../models/postModel");

module.exports = async(req, res) => {
    try {
        const {title, description} = req.body;

        const notice = await postModel.findById({_id: req.query.id});

        const updatedNotice = await postModel.findByIdAndUpdate({_id: req.query.id}, {
            title: title || notice?.title,
            description: description || notice?.description
        }, {new: true});

        res.status(200).send({
            success: true,
            message: 'Your post has been updated successfully',
            updatedNotice
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