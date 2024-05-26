const colors = require('colors');
const verifyIfExist = require('../../../middlewares/verifyIfExist');
const { hashPassword } = require('../../../helpers/authHelper');
const adminModel = require('../../../models/adminModel');

module.exports = async(req, res) => {
    try {
        const admin = req.body;
        // validation
        if(!admin.employeeId){
            return res.status(500).send({
                success: false,
                message: 'Id is required'
            });
        }
        if(!admin.name){
            return res.status(500).send({
                success: false,
                message: 'Name is required'
            });
        }
        if(!admin.email){
            return res.status(500).send({
                success: false,
                message: 'Email is required'
            });
        }
        if(!admin.password || admin.password.length < 6){
            return res.status(500).send({
                success: false,
                message: 'Password is required and min 6 char length'
            });
        }
        if(!admin.phone){
            return res.status(500).send({
                success: false,
                message: 'Phone is required'
            });
        }
        
        // check if admin already exist
        const existingAdmin = await adminModel.findOne({adminId: admin.adminId, email: admin.email});
        if(existingAdmin){
            return res.status(500).send({
                success: false,
                message: 'Admin already registered with this email'
            });
        }

        // create hashed password
        const hashedPassword = await hashPassword(admin.password);

        // save admin
        const newAdmin = await adminModel({
            employeeId: admin.employeeId,
            name: admin.name,
            email: admin.email,
            password: hashedPassword,
            phone: admin.phone,
            // profileImage: admin.profileImage
        }).save();

        res.status(200).send({
            success: true,
            message: 'Admin registration successfull',
            newAdmin
        });
    } catch (error) {
        console.log(`Error in register admin: ${error}`.bgRed);
        return res.status(500).send({
            success: false,
            message: 'Error in register admin api',
            error
        });
    }
}