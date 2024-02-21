const postModel = require("../../models/postModel");

module.exports = async(req, res) => {
    try {
        // console.log('Request Body: ', req.body);
        // console.log('Request Params: ', req.query);
        // console.log('Request File: ', req.file);

        if(req.query.type == 'campaign'){ // create new post
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
                image: req.file.path,
                description: description,
                type: req.query.type,
                postedBy: req.id
            }).save();

            res.status(200).send({
                success: true,
                message: 'Post created successfully',
                post
            });
        }
        else if(req.query.type == 'notice'){ // create new notice
            const {title, description} = req.body;
            // validation
            if(!title || !description){
                return res.status(500).send({
                    success: false,
                    message: 'Please provide all the details'
                });
            }

            console.log('postedBy: ', req.id);

            // save notice
            const notice = await postModel({
                title: title,
                description: description,
                type: 'notice',
                postedBy: req.id
            }).save();

            res.status(200).send({
                success: true,
                message: 'Notice created successfully',
                notice
            });
        }
    } catch (error) {
        console.log(`Error in create-post api: ${error}`.bgRed.white);
        return res.status(500).send({
            success: false,
            message: 'Error in create-post api',
            error
        });
    }
}