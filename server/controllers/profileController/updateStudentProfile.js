const studentModel = require("../../models/studentModel");

module.exports = async(req, res) => {
    try {
        // validation
        if(req.body.phone.length != 10 || req.body.parentPhone.length != 10){
            return res.status(500).send({
                success: false,
                message: 'Enter a valid phone no.'
            });
        }

        const student = await studentModel.findById({_id: req.id});

        const user = await studentModel.findByIdAndUpdate({_id: req.id}, {
            name: req.body.name || student?.name,
            roll: req.body.roll || student?.roll,
            email: req.body.email || student?.email,
            password: req.body.password || student?.password,
            phone: req.body.phone || student?.phone,
            parentPhone: req.body.parentPhone || student?.parentPhone,
            course: req.body.course || student?.course,
            department: req.body.department || student?.department,
            dob: req.body.dob || student?.dob,
            gender: req.body.gender || student?.gender,
            // profileImage: req.file.filename || student?.profileImage,
            profileImage: student?.profileImage,
            userType: req.body.userType || student?.userType
        }, {new: true});

        // making password undefined
        user.password = undefined;

        const token = req.headers['auth-token']

        res.status(200).send({
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