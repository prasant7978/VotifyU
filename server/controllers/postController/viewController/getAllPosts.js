const postModel = require("../../../models/postModel");

module.exports = async(req, res) => {
    try {
        const posts = await postModel.find().sort({createdAt: -1});

        // populate postedBy on basis of userType
        for(let i=0; i<posts.length; i++){
            if(posts[i].userType === 'admin')
                posts[i] = await posts[i].populate('postedBy', '_id name profileImage role', 'Admin');
            else
                posts[i] = await posts[i].populate('postedBy', '_id name profileImage role', 'Student');
        }

        res.status(200).send({
            success: true,
            message: 'All posts have been fetched',
            posts
        });
    } catch (error) {
        console.log(`Error in get-all-post api: ${error}`.bgRed.white);
        return res.status(500).send({
            success: false,
            message: 'Error in get-all-post api',
            error
        });
    }
}