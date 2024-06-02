const postModel = require("../../models/postModel");
const studentModel = require("../../models/studentModel");
const candidateModel = require("../../models/candidateModel");

const { S3Client, DeleteObjectCommand } = require("@aws-sdk/client-s3");

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
            res.status(500).send({
                success: false,
                mesage: 'User is not authorized to delete student'
            });
        }

        const student = await studentModel.findById({_id: req.query.studentId})
        if(!student){
            res.status(500).send({
                success: false,
                message: 'Student not found'
            });
        }

        // delete profileImage from bucket
        const params = {
            Bucket: bucketName,
            Key: student.profileImage
        }

        const command = new DeleteObjectCommand(params);
        await s3.send(command)

        // delete student
        const deletedStudent = await studentModel.findByIdAndDelete({_id: student._id});
        if(!deletedStudent){
            res.status(500).send({
                success: false,
                message: 'Error in deleting student'
            });
        }

        // delete all posts related to the deleted student
        const posts = await postModel.find({postedBy: student._id});
        for(const post of posts){
            const params = {
                Bucket: bucketName,
                Key: post.image
            }
            
            const command = new DeleteObjectCommand(params);
            await s3.send(command)
        }
        
        await postModel.deleteMany({postedBy: req.query.studentId});
        
        // delete corresponding candidate if present
        await candidateModel.deleteOne({student: req.query.studentId})

        res.status(200).send({
            success: true,
            message: 'Student has been deleted successfully'
        });
    } catch (error) {
        console.log(`Error in delete-student-profile api: ${error}`.bgRed.white);
        return res.status(500).send({
            success: false,
            message: 'Error in delete-student-profile api',
            error
        });
    }
}