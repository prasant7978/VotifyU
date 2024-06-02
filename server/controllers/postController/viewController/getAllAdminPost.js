const postModel = require("../../../models/postModel");

const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");

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
        const posts = await postModel.find({postedBy: req.id}).sort({createdAt: -1});

        if(!posts){
            return res.status(500).send({
                success: false,
                message: 'Admin Posts Not Found'
            });
        }

        for(let i=0; i<posts.length; i++){
            if(posts[i].type === 'campaign'){
                var getObjectParams = {
                    Bucket: bucketName,
                    Key: posts[i].image
                }
                var command = new GetObjectCommand(getObjectParams);
                var url = await getSignedUrl(s3, command, { expiresIn: 3600 });
                posts[i]._doc.imageUrl = url;
            }
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