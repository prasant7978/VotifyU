const postModel = require("../../models/postModel");

module.exports = async(req, res) => {
    try {
        const {id} = req.query;

        await postModel.findByIdAndDelete({_id: id});

        res.status(200).send({
            success: true,
            message: req.userType === 'student' ? 'Your post has been deleted successfully' : 'The post has been deleted succesfully'
        });
    } catch (error) {
        console.log(`Error in delete-post api: ${error}`.bgRed.white);
        return res.status(500).send({
            success: false,
            message: 'Error in delete-post api',
            error
        });
    }
}