const studentModel = require("../../models/studentModel");

module.exports = async(req, res) => {
    try {
        // validation
        if(req.body.studentPhone.length != 10 || req.body.studentParentPhone.length != 10){
            return res.status(500).send({
                success: false,
                message: 'Enter a valid phone no.'
            });
        }

        const student = await studentModel.findById({_id: req.query.id});

        const updatedStudent = await studentModel.findByIdAndUpdate({_id: req.query.id}, {
            studentName: req.body.studentName || student?.studentName,
            studentRoll: req.body.studentRoll || student?.studentRoll,
            studentEmail: req.body.studentEmail || student?.studentEmail,
            studentPassword: req.body.studentPassword || student?.studentPassword,
            studentPhone: req.body.studentPhone || student?.studentPhone,
            studentParentPhone: req.body.studentParentPhone || student?.studentParentPhone,
            studentCourse: req.body.studentCourse || student?.studentCourse,
            studentDepartment: req.body.studentDepartment || student?.studentDepartment,
            studentDOB: req.body.studentDOB || student?.studentDOB,
            studentGender: req.body.studentGender || student?.studentGender,
            studentProfileImage: req.file.path || student?.studentProfileImage,
            userType: req.body.userType || student?.userType
        }, {new: true});

        res.status(200).send({
            success: true,
            message: 'Profile has been updated successfully',
            updatedStudent
        });
    } catch (error) {
        console.log(`Error in update-student-profile api: ${error}`.bgRed.white);
        return res.status(500).send({
            success: false,
            message: 'Error in update-student-profile api',
            error
        });
    }
}