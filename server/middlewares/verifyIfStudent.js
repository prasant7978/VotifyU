const studentModel = require("../models/studentModel")

module.exports = async(req, res, next) => {
    try {
        const isStudent = await studentModel.findOne({_id: req.id})

        if(!isStudent){
            return res.status(500).send({
                success: false,
                message: 'Sorry, only registered NITC students are allowed to vote in this election.'
            });
        }

        next();
    } catch (error) {
        console.log('Error in verifying the user as student: ', error);
        return res.status(500).send({
            success: false,
            message: 'Error in verifying the user as student',
            error
        });
    }
}