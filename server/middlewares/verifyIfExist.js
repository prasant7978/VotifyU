const adminModel = require("../models/adminModel");
const studentModel = require("../models/studentModel")

module.exports = async(req, res, next) => {
    if(req.body.userType === "admin"){
        const {employeeId, adminEmail, adminPassword} = req.body;

        // validation
        if(!employeeId || !adminEmail || !adminPassword){
            return res.status(500).send({
                success: false,
                message: 'Please Provide All admin Details'
            });
        }

        const admin = await adminModel.findOne({employeeId: req.body.employeeId, adminEmail: req.body.adminEmail});
        if(!admin){
            return res.status(500).send({
                success: false,
                message: 'Admin Not Found'
            });
        }
        
        req.id = admin.employeeId;
        req.userType = admin.userType;
        req.adminPassword = admin.adminPassword;

        next();
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