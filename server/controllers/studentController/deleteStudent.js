const postModel = require("../../models/postModel");
const studentModel = require("../../models/studentModel");
const candidateModel = require("../../models/candidateModel");

module.exports = async(req, res) => {
    try {
        if(req.userType != 'admin'){
            res.status(500).send({
                success: false,
                mesage: 'User is not authorized to delete student'
            });
        }

        // delete student
        const deletedStudent = await studentModel.findByIdAndDelete({_id: req.query.studentId});

        if(!deletedStudent){
            res.status(500).send({
                success: false,
                message: 'Student not found'
            });
        }

        // delete all posts related to the deleted student
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