const studentModel = require("../../models/studentModel");

module.exports = async(req, res) => {
    try {
        // console.log('req body: ', req.body);
        // console.log('req file: ', req.file);

        // validation
        if(req.body.phone?.length != 10 || req.body.parentPhone.length != 10){
            return res.status(500).send({
                success: false,
                message: 'Enter a valid phone no.'
            });
        }

        const student = await studentModel.findById({_id: req.query.studentId});

        if(!student){
            return res.status(500).send({
                success: false,
                message: 'Student Not Found'
            })
        }

        const user = await studentModel.findByIdAndUpdate({_id: req.query.studentId}, {
            name: req.body.name || student?.name,
            roll: req.body.roll || student?.roll,
            email: req.body.email || student?.email,
            phone: req.body.phone || student?.phone,
            parentPhone: req.body.parentPhone || student?.parentPhone,
            course: req.body.course || student?.course,
            department: req.body.department || student?.department,
            dob: req.body.dob || student?.dob,
            gender: req.body.gender || student?.gender,
            profileImage: student?.profileImage,
            userType: req.body.userType || student?.userType
        }, {new: true});

        // making password undefined
        user.password = undefined;

        res.status(200).send({
            success: true,
            message: 'Student has been updated successfully',
            user,
        });
    } catch (error) {
        console.log(`Error in update-student api: ${error}`.bgRed.white);
        return res.status(500).send({
            success: false,
            message: 'Error in update-student api',
            error
        });
    }
}