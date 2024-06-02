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

module.exports = async(req, res) => {
    try {
        const applications = await candidateModel.find({status: 'pending'});

        // populating the position and student attribute
        for(let i=0; i<applications.length; i++){
            applications[i] = await applications[i].populate('position', '_id name', 'Position');
            applications[i] = await applications[i].populate('student', '_id name profileImage', 'Student');

            const getObjectParams = {
                Bucket: bucketName,
                Key: applications[i].student.profileImage
            }
            const command = new GetObjectCommand(getObjectParams);
            const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
            applications[i]._doc.imageUrl = url;
        }

        res.status(200).send({
            success: true,
            message: 'all candidate applications have been fetched',
            applications
        });
    } catch (error) {
        console.log(`Error in view-all-candidate-applications api: ${error}`.bgRed.white);
        return res.status(500).send({
            success: false,
            message: 'Error in view-all-candidate-applications api',
            error
        });
    }
}