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
        const student = await studentModel.findById({_id: req.id});
        if(!student){
            return res.status(500).send({
                success: false,
                message: 'Student not found'
            });
        }

        // undefine password
        student.password = undefined

        const getObjectParams = {
            Bucket: bucketName,
            Key: student.profileImage
        }
        const command = new GetObjectCommand(getObjectParams);
        const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
        posts[i]._doc.imageUrl = url;

        res.status(200).send({
            success: true,
            message: 'Student profile found',
            student
        });
    } catch (error) {
        console.log(`Error in get-student-profile api: ${error}`.bgRed.white);
        return res.status(500).send({
            success: false,
            message: 'Error in get-student-profile api',
            error
        });
    }
}