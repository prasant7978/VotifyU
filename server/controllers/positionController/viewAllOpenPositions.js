const candidateModel = require("../../models/candidateModel");
const positionModel = require("../../models/positionModel");

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
        let positions = await positionModel.find({status: 'open'});

        if(!positions){
            return res.status(500).send({
                success: false,
                message: 'Positions not found'
            })
        }

        // populate elected candidate
        for(let i=0; i<positions.length; i++){
            let candidate = await candidateModel.findOne({_id: positions[i].electedCandidate});
            
            if(candidate){
                candidate = await candidate.populate('student', '_id name profileImage', 'Student');

                const getObjectParams = {
                    Bucket: bucketName,
                    Key: candidate.student.profileImage
                }
                const command = new GetObjectCommand(getObjectParams);
                const url = await getSignedUrl(s3, command, { expiresIn: 3600 });

                positions[i]._doc['candidate'] = {
                    candidateId: candidate._id,
                    studentId: candidate.student._id,
                    name: candidate.student.name,
                    imageUrl: url
                }
            }
        }

        // console.log('req query: ', req.body);

        if(req.query.type === 'unvotedPositions'){
            const unvotedPositions = positions.filter((position) => !position.studentVoted.includes(req.id))
            return res.status(200).send({
                success: true,
                message: "All positions on which the user has not voted have been fetched.",
                positions: unvotedPositions
            })
        }

        // console.log('positions: ', positions);

        res.status(200).send({
            success: true,
            message: "All open positions have been fetched",
            positions
        })
    } catch (error) {
        console.log(`Error in view-all-open-position api: ${error}`.bgRed.white);
        return res.status(500).send({
            success: false,
            message: 'Error in view-all-open-position api',
            error
        });
    }
}