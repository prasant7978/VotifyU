const studentModel = require("../../models/studentModel");

module.exports = async(req, res) => {
    try {
        // console.log('req body in updateStudentProfile: ', req.body);
        // console.log('req file in updateStudentProfile: ', req.file);

        const student = await studentModel.findById({_id: req.id});

        if(!student){
            return res.status(500).send({
                success: false,
                message: 'Student Not Found'
            })
        }

        if(req.file){
            var user = await studentModel.findByIdAndUpdate({_id: req.id}, {
                profileImage: req.file?.filename || student?.profileImage,
            }, {new: true});
        }
        else{
            user = await studentModel.findByIdAndUpdate({_id: req.id}, {
                name: req.body.name || student?.name,
                roll: req.body.roll || student?.roll,
                email: req.body.email || student?.email,
                phone: req.body.phone || student?.phone,
                parentPhone: req.body.parentPhone || student?.parentPhone,
                course: req.body.course || student?.course,
                department: req.body.department || student?.department,
                dob: req.body.dob || student?.dob,
                gender: req.body.gender || student?.gender,
            }, {new: true});
        }

        // making password undefined
        user.password = undefined;

        const token = req.headers['auth-token']

        return res.status(200).send({
            success: true,
            message: 'Profile has been updated successfully',
            user,
            token
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