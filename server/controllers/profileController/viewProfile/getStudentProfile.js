const studentModel = require("../../../models/studentModel");

module.exports = async(req, res) => {
    try {
        const student = await studentModel.findById({_id: req.id});
        if(!student){
            return res.status(500).send({
                success: false,
                message: 'Student not found'
            });
        }

        // undefine password
        student.password = undefined

        res.status(200).send({
            success: true,
            message: 'Student profile found',
            student
        });
    } catch (error) {
        console.log(`Error in get-student-profile api: ${error}`.bgRed.white);
        return res.status(500).send({
            success: false,
            message: 'Error in get-student-profile api',
            error
        });
    }
}