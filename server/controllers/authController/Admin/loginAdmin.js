const colors = require('colors');
const { comparePassword } = require('../../../helpers/authHelper');
const generateAuthToken = require('../../tokenController/generateAuthToken');

module.exports = async(req, res) => {
    try {
        // match password
        const match = await comparePassword(req.body.password, req.password);
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
            user: req.user,
            token,
        });
    } catch (error) {
        console.log(`Error in admin login: ${error}`.bgRed.white);
        return res.status(500).send({
            success: false,
            message: 'Error in admin login api',
            error
        });
    }
}