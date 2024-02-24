const studentModel = require("../../models/studentModel");

module.exports = async(req, res) => {
    try {
        if(req.userType != 'admin'){
            return res.status(500).send({
                success: false,
                message: 'User not authorized to view all students'
            });
        }

        const students = await studentModel.find({userType: 'candidate'});
        if(!students){
            return res.status(500).send({
                success: false,
                message: 'Candidates not found'
            });
        }

        for(let i=0; i<students.length; i++){
            students[i].studentPassword = undefined
        }

        res.status(200).send({
            success: true,
            message: 'All candidates profile found',
            students
        });
    } catch (error) {
        console.log(`Error in get-all-candidates-profile api: ${error}`.bgRed.white);
        return res.status(500).send({
            success: false,
            message: 'Error in get-all-candidates-profile api',
            error
        });
    }
}