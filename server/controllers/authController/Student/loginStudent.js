const colors = require('colors');
const { comparePassword } = require("../../../helpers/authHelper");
const generateAuthToken = require("../../tokenController/generateAuthToken");

module.exports = async(req, res) => {
    try {
        // match password
        const match = await comparePassword(req.body.studentPassword, req.studentPassword);
        if(!match){
            return res.status(500).send({
                success: false,
                message: 'Invalid Username or Password'
            });
        }

        // generate jwt token
        const token = await generateAuthToken(req.id, req.userType);

        res.status(200).send({
            success: true,
            message: 'Login Successfull',
            token,
        });
    } catch (error) {
        console.log(`Error in student login: ${error}`.bgRed.white);
        return res.status(500).send({
            success: false,
            message: 'Error in student login api',
            error
        });
    }
}