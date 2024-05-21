const colors = require('colors');
const { hashPassword } = require('../../helpers/authHelper');
const studentModel = require('../../models/studentModel');

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
        
        // create password from email
        const password = '123456'

        // create hashed password
        const hashedPassword = await hashPassword(password);
        
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
        console.log(`Error in registering the student: ${error}`.bgRed.white);
        return res.status(500).send({
            success: false,
            message: 'Error in add-student api',
            error: error
        });
    }
}