const studentModel = require("../models/studentModel")

module.exports = async(req, res, next) => {
    if(req.body.userType == "admin"){
        
    }
    else{
        const {studentEmail, studentPassword} = req.body;

        // validation
        if(!studentEmail || !studentPassword){
            return res.status(500).send({
                success: false,
                message: 'Please Provide All Details'
            });
        }

        const student = await studentModel.findOne({studentEmail: req.body.studentEmail})
        if(!student){
            return res.status(500).send({
                success: false,
                message: 'Student Not Found'
            });
        }
        
        req.id = student._id;
        req.userType = student.userType;
        req.studentPassword = student.studentPassword;

        next();
    }
}