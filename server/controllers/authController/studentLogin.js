const colors = require('colors');
const { comparePassword } = require('../../helpers/authHelper');
const generateAuthToken = require('../tokenController/generateAuthToken');

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
        // match password
        const match = await comparePassword(req.body.password, req.password);
        if(!match){
            return res.status(500).send({
                success: false,
                message: 'Invalid Username or Password'
            });
        }

        // generate jwt token
        const token = await generateAuthToken(req.id, req.userType);

        const getObjectParams = {
            Bucket: bucketName,
            Key: req.user.profileImage
        }
        const command = new GetObjectCommand(getObjectParams);
        const url = await getSignedUrl(s3, command, { expiresIn: 3600 });

        req.user._doc.imageUrl = url

        res.status(200).send({
            success: true,
            message: 'Login Successfull',
            user: req.user,
            loginType: 'student',
            token,
        });
    } catch (error) {
        console.log(`Error in student login: ${error}`.bgRed.white);
        return res.status(500).send({
            success: false,
            message: 'Error in student login api',
            error
        });
    }
}