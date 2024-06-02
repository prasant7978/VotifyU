const postModel = require("../../models/postModel");

const { S3Client, DeleteObjectCommand } = require("@aws-sdk/client-s3");

const dotenv = require('dotenv')

dotenv.config()

const bucketName = process.env.BUCKET_NAME
const bucketRegion = process.env.BUCKET_REGION
const accessKey = process.env.ACCESS_KEY
const secretAccessKey = process.env.SECRET_ACCESS_KEY

const s3 = new S3Client({
    credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretAccessKey,
    },
    region: bucketRegion
});

module.exports = async(req, res) => {
    try {
        const post = await postModel.findById({_id: req.query.postId});

        if(!post){
            return res.status(500).send({
                success: false,
                message: 'Post Not Found'
            })
        }

        // delete image from bucket
        const params = {
            Bucket: bucketName,
            Key: post.image
        }

        const command = new DeleteObjectCommand(params);
        await s3.send(command)

        const deletedPost = await postModel.findByIdAndDelete({_id: post._id});

        if(!deletedPost){
            return res.status(500).send({
                success: false,
                message: 'Error in deleting the post'
            })
        }

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