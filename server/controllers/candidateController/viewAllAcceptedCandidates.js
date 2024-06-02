const candidateModel = require("../../models/candidateModel");

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

const getUrl = async(name) => {
    
}

module.exports = async(req, res) => {
    try {
        const candidates = await candidateModel.find({status: 'accepted'});

        // populating the position and student attribute
        for(let i=0; i<candidates.length; i++){
            candidates[i] = await candidates[i].populate('position', '_id name', 'Position');
            candidates[i] = await candidates[i].populate('student', '_id name profileImage', 'Student');

            const getObjectParams = {
                Bucket: bucketName,
                Key: candidates[i].student.profileImage
            }
            const command = new GetObjectCommand(getObjectParams);
            const url = await getSignedUrl(s3, command, { expiresIn: 3600 });

            candidates[i]._doc.imageUrl = url
        }

        // console.log('all candidates: ', candidates);

        res.status(200).send({
            success: true,
            message: 'all candidates have been fetched',
            candidates
        });
    } catch (error) {
        console.log(`Error in view-all-accepted-candidates api: ${error}`.bgRed.white);
        return res.status(500).send({
            success: false,
            message: 'Error in view-all-accepted-candidates api',
            error
        });
    }
}