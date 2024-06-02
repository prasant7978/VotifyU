const studentModel = require("../../../models/studentModel");

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
        if(req.userType != 'admin'){
            return res.status(500).send({
                success: false,
                message: 'User not authorized to view all candidates'
            });
        }

        const students = await studentModel.find({userType: 'candidate'});
        if(!students){
            return res.status(500).send({
                success: false,
                message: 'Candidates not found'
            });
        }

        for(let i=0; i<students.length; i++){
            students[i].password = undefined

            const getObjectParams = {
                Bucket: bucketName,
                Key: students[i].profileImage
            }
            const command = new GetObjectCommand(getObjectParams);
            const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
            students[i]._doc.imageUrl = url;
        }

        res.status(200).send({
            success: true,
            message: 'All candidates profile found',
            students
        });
    } catch (error) {
        console.log(`Error in get-all-candidates-profile api: ${error}`.bgRed.white);
        return res.status(500).send({
            success: false,
            message: 'Error in get-all-candidates-profile api',
            error
        });
    }
}