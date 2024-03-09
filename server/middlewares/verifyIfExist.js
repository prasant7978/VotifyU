const adminModel = require("../models/adminModel");
const studentModel = require("../models/studentModel")

module.exports = async(req, res, next) => {
    if(req.body.userType === "admin"){
        const {employeeId, email, password} = req.body;

        // validation
        if(!employeeId || !email || !password){
            return res.status(500).send({
                success: false,
                message: 'Please Provide All admin Details'
            });
        }

        const admin = await adminModel.findOne({employeeId: req.body.employeeId, email: req.body.email});
        if(!admin){
            return res.status(500).send({
                success: false,
                message: 'Admin Not Found'
            });
        }
        
        req.user = admin
        req.id = admin._id;
        req.userType = admin.userType;
        req.password = admin.password;

        next();
    }
    else{
        const {email, password} = req.body;

        // validation
        if(!email || !password){
            return res.status(500).send({
                success: false,
                message: 'Please Provide All Details'
            });
        }

        const student = await studentModel.findOne({email: req.body.email})
        if(!student){
            return res.status(500).send({
                success: false,
                message: 'Student Not Found'
            });
        }
        
        req.user = student
        req.id = student._id;
        req.userType = student.userType;
        req.password = student.password;

        next();
    }
}