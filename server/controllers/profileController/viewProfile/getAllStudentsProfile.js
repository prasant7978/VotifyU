const studentModel = require("../../../models/studentModel");

module.exports = async(req, res) => {
    try {
        if(req.userType != 'admin'){
            return res.status(500).send({
                success: false,
                message: 'User not authorized to view all students'
            });
        }

        const students = await studentModel.find();
        if(!students){
            return res.status(500).send({
                success: false,
                message: 'Students not found'
            });
        }

        for(let i=0; i<students.length; i++){
            students[i].password = undefined
        }

        res.status(200).send({
            success: true,
            message: 'All students profile found',
            students
        });
    } catch (error) {
        console.log(`Error in get-all-students-profile api: ${error}`.bgRed.white);
        return res.status(500).send({
            success: false,
            message: 'Error in get-all-students-profile api',
            error
        });
    }
}