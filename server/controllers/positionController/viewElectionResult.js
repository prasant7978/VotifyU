const positionModel = require("../../models/positionModel");
const candidateModel = require("../../models/candidateModel");

const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");

const dotenv = require('dotenv');
const studentModel = require("../../models/studentModel");

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
        const position = await positionModel.findOne({_id: req.query.positionId});

        if(!position){
            return res.status(500).send({
                success: false,
                message: 'Position Not Found'
            });
        }

        const voteCountArr = position.results;

        for(let i=0; i<voteCountArr.length; i++){
            const student = await studentModel.findById({_id: voteCountArr[i].id})

            const getObjectParams = {
                Bucket: bucketName,
                Key: student.profileImage
            }
            const command = new GetObjectCommand(getObjectParams);
            const url = await getSignedUrl(s3, command, { expiresIn: 3600 });

            voteCountArr[i]._doc.imageUrl = url
        }
        
        // check for vote tie
        let status
        if(voteCountArr.length > 1 && voteCountArr[0].voteCount === voteCountArr[1].voteCount)
            status = 'tie'
        else
        status = 'majority'
    
        // console.log('election results: ', voteCountArr);

        return res.status(200).send({
            success: true,
            messgae: `Result Fetched for ${position.name}`,
            position: position.name,
            status: status,
            voteCountArr
        });
    } catch (error) {
        console.log('Error in view-election-results API: ', error);
        return res.status(500).send({
            success: false,
            message: 'Error in getting the election result',
            error
        });
    }
}