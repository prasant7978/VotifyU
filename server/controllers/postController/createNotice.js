const postModel = require("../../models/postModel");

module.exports = async(req, res) => {
    try {
        const {title, description} = req.body;
            // validation
            if(!title || !description){
                return res.status(500).send({
                    success: false,
                    message: 'Please provide all the details'
                });
            }

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
    } catch (error) {
        console.log(`Error in create-post notice api: ${error}`.bgRed.white);
        return res.status(500).send({
            success: false,
            message: 'Error in create-post notice api',
            error
        });
    }
}