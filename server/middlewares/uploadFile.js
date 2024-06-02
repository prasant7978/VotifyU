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
    // userName = userName?.replace(/\s/g, "-");

    const storage = multer.memoryStorage()
    const upload = multer({ storage: storage })

    upload.array('documents[]')(req, res, async function(err){
        if(err){
            console.log('Error in uploading the files: ', err);
            return res.status(500).send({
                success: false,
                message: 'Error in uploading the files',
                err
            });
        }
        else{
            const uploadedFiles = await Promise.all(req.files.map(async(file) => {
                const fileName = randomImageName();

                const params = {
                    Bucket: bucketName,
                    Key: fileName,
                    Body: file.buffer,
                    ContentType: file.mimetype
                }

                const command = new PutObjectCommand(params)
                await s3.send(command)

                // console.log('fileName: ', fileName);
                // console.log('file: ', file);

                return fileName
            }))

            req.uploadedFiles = uploadedFiles;
            next();
        }
    })

    // store in disk
    // const storage = multer.diskStorage({
    //     destination: function (req, file, cb) {
    //         cb(null, 'uploads/files/')
    //     },
    //     filename: function (req, file, cb) {
    //         cb(null, Date.now() + '-' + userName + '-' + file.originalname)
    //     }
    // });

    // const upload = multer({ storage });

    // try {
    //     upload.array("documents[]")(req, res, function(err){
    //         if(err){
    //             console.log('Errorrrr: ', err);
    //             res.status(500).send({
    //                 success: false,
    //                 message: 'Error in uploading the files',
    //                 error
    //             });
    //         }
    //         else{
    //             const uploadedFiles = req.files.map(file => ({
    //                 originalname: file.originalname,
    //                 filename: file.filename,
    //                 path: file.path,
    //             }));

    //             // console.log('file uploaded...\n', uploadedFiles);
    //             console.log('files have been uploaded...');
    //             next();
    //         }
    //     });

    // } catch (error) {
    //     console.log('Error in uploading the file: ', error);
    //     res.status(500).send({
    //         success: false,
    //         message: 'Error in uploading the file',
    //         error
    //     });
    // }
};