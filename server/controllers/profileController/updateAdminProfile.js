const adminModel = require("../../models/adminModel");

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
        // console.log('req body in updateAdminProfile: ', req.body);
        // console.log('req file in updateAdminProfile: ', req.file);

        const admin = await adminModel.findById({_id: req.id});

        if(!admin){
            return res.status(500).send({
                success: false,
                message: 'Admin Not Found'
            })
        }

        if(req.file){
            var user = await adminModel.findByIdAndUpdate({_id: req.id}, {
                profileImage: req.imageName || admin?.profileImage,
            }, {new: true});
        }
        else{
            user = await adminModel.findByIdAndUpdate({_id: req.id}, {
                name: req.body.name || admin?.name,
                email: req.body.email || admin?.email,
                phone: req.body.phone || admin?.phone,
            }, {new: true});
        }

        // making password undefined
        user.password = undefined;

        const token = req.headers['auth-token']

        if(user.profileImage){
            const getObjectParams = {
                Bucket: bucketName,
                Key: user.profileImage
            }
            const command = new GetObjectCommand(getObjectParams);
            const url = await getSignedUrl(s3, command, { expiresIn: 3600 });

            user._doc.imageUrl = url
        }

        return res.status(200).send({
            success: true,
            message: 'Profile has been updated successfully',
            user,
            token
        });
    } catch (error) {
        console.log(`Error in update-admin-profile api: ${error}`.bgRed.white);
        return res.status(500).send({
            success: false,
            message: 'Error in update-admin-profile api',
            error
        });
    }
}