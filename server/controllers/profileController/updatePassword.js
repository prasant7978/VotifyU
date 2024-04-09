const { hashPassword } = require("../../helpers/authHelper");
const studentModel = require("../../models/studentModel");

module.exports = async(req, res) => {
    try{
        if(req.body.password.length < 6){
            return res.status(500).send({
                success: false,
                message: 'Password must be minimum of 6 character long'
            });
        }

        // create hashed password
        const hashedPassword = await hashPassword(req.body.password);
        
        // update password
        const user = await studentModel.findByIdAndUpdate({_id: req.id}, {
            password: hashedPassword
        }, {new: true});

        res.status(200).send({
            success: true,
            message: 'Password updated successfully.'
        });
    } catch (error) {
        console.log(`Error in update-password api: ${error}`.bgRed.white);
        return res.status(500).send({
            success: false,
            message: 'Error in update-password api',
            error
        });
    }
}