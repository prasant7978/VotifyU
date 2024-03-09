const colors = require('colors');
const verifyIfExist = require('../../../middlewares/verifyIfExist');
const { hashPassword } = require('../../../helpers/authHelper');
const studentModel = require('../../../models/studentModel');

module.exports = async(req, res) => {
    try {
        const student = req.body;
        // validation
        if(!student.name){
            return res.status(500).send({
                success: false,
                message: 'Name Is Required'
            });
        }
        if(!student.roll){
            return res.status(500).send({
                success: false,
                message: 'Roll No. Is Required'
            });
        }
        if(!student.email){
            return res.status(500).send({
                success: false,
                message: 'Email Is Required'
            });
        }
        if(!student.password || student.password.length < 6){
            return res.status(500).send({
                success: false,
                message: 'Password Is Required And Min 6 Char Length'
            });
        }
        if(!student.phone || student.phone.length < 10){
            return res.status(500).send({
                success: false,
                message: 'Phone Is Required'
            });
        }

        // check if student already exist
        const existingStudent = await studentModel.findOne({email: student.email});
        
        if(existingStudent){
            return res.status(500).send({
                success: false,
                message: 'Student already registered with this email'
            });
        }
        
        // create hashed password
        const hashedPassword = await hashPassword(student.password);
        
        // save student
        const newStudent = await studentModel({
            name: student.name,
            roll: student.roll,
            email: student.email,
            password: hashedPassword,
            phone: student.phone
        }).save();

        res.status(200).send({
            success: true,
            message: 'Student Registration Successfull',
            newStudent
        });
    } catch (error) {
        console.log(`Error in register student: ${error}`.bgRed.white);
        return res.status(500).send({
            success: false,
            message: 'Error in register student api',
            error: error
        });
    }
}