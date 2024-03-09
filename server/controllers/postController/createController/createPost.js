const postModel = require("../../../models/postModel");

module.exports = async(req, res) => {
    try {
        // console.log('Request Body: ', req.body);
        // console.log('Request Params: ', req.query);
        // console.log('Request File: ', req.file);

        const file = req.file;
        if(!file){
            return res.status(500).send({
                success: false,
                message: 'Provide a image to upload'
            });
        }

        const {description} = req.body;
        if(!description){
            return res.status(500).send({
                success: false,
                message: 'Provide some description about the post'
            });
        }

        // save post
        const post = await postModel({
            image: req.file.filename,
            description: description,
            type: req.query.type,
            postedBy: req.id,
            userType: req.userType
        }).save();

        res.status(200).send({
            success: true,
            message: 'Post created successfully',
            post
        });
    } catch (error) {
        console.log(`Error in create-post campaign api: ${error}`.bgRed.white);
        return res.status(500).send({
            success: false,
            message: 'Error in create-post campaign api',
            error
        });
    }
}