const colors = require('colors');
const { comparePassword } = require('../../helpers/authHelper');
const generateAuthToken = require('../tokenController/generateAuthToken');
const candidateModel = require('../../models/candidateModel');

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

        const candidate = await candidateModel.findOne({student: req.id});
        if(!candidate){
            return res.status(500).send({
                success: false,
                message: 'You have not registered for the candidate'
            })
        }
        else if(candidate.status === 'pending'){
            return res.status(500).send({
                success: false,
                message: 'Your application is still under review. You have to be approved as a candidate to login as candidate.'
            })
        }

        // generate jwt token
        const token = await generateAuthToken(candidate._id, req.userType);

        req.user._doc['candidateId'] = candidate._id;
        // console.log('req.user in candidate login: ', req.user);

        if(req.user.profileImage){
            const getObjectParams = {
                Bucket: bucketName,
                Key: req.user.profileImage
            }
            const command = new GetObjectCommand(getObjectParams);
            const url = await getSignedUrl(s3, command, { expiresIn: 3600 });

            req.user._doc.imageUrl = url
        }

        res.status(200).send({
            success: true,
            message: 'Login Successfull',
            user: req.user,
            loginType: 'candidate',
            token,
        });
    } catch (error) {
        console.log(`Error in candidate login: ${error}`.bgRed.white);
        return res.status(500).send({
            success: false,
            message: 'Error in candidate login api',
            error
        });
    }
}