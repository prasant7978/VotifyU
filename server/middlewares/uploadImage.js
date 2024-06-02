const multer = require('multer');
const crypto = require('crypto');
const getUserName = require('../functions/getUserName');

const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

const dotenv = require('dotenv')

dotenv.config()

const randomImageName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex');

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

module.exports = async(req, res, next) => {
    // get user name
    // var userName = await getUserName(req.id, req.query.type, req.userType);
    // userName = userName.replace(/\s/g, "-");

    const storage = multer.memoryStorage()
    const upload = multer({ storage: storage })

    upload.single('image')(req, res, async function(err){
        if(err){
            console.log('Error in uploading the image: ', err);
            return res.status(500).send({
                success: false,
                message: 'Error in uploading the image',
                err
            });
        }
        else{
            const imageName = randomImageName();

            const params = {
                Bucket: bucketName,
                Key: imageName,
                Body: req.file.buffer,
                ContentType: req.file.mimetype
            }

            const command = new PutObjectCommand(params)
            await s3.send(command)

            req.imageName = imageName
            next();
        }
    })

    // store in disk
    // const storage = multer.diskStorage({
    //     destination: function (req, file, cb) {
    //         if(req.query.type == 'campaign')
    //             cb(null, 'uploads/campaign/')
    //         else if(req.query.type == 'profile')
    //             cb(null, 'uploads/profile/')
    //     },
    //     filename: function (req, file, cb) {
    //         cb(null, Date.now() + '-' + userName + '-' + file.originalname)
    //     }
    // });

    // const upload = multer({ storage });

    // try {
    //     upload.single("image")(req, res, function(err){
    //         if(err){
    //             console.log('Errorrrr: ', err);
    //             return res.status(500).send({
    //                 success: false,
    //                 message: 'Error in uploading the image',
    //                 err
    //             });
    //         }
    //         else{
    //             console.log('file uploaded...');
    //             next();
    //         }
    //     });
    // } catch (error) {
    //     console.log('Error in uploading the image: ', error);
    //     return res.status(500).send({
    //         success: false,
    //         message: 'Error in uploading the image',
    //         error
    //     });
    // }
};