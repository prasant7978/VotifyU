const colors = require('colors');
const { comparePassword } = require("../../../helpers/authHelper");
const generateAuthToken = require("../../tokenController/generateAuthToken");
const candidateModel = require('../../../models/candidateModel');

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

        const candidate = await candidateModel.findOne({student: req.id});
        if(!candidate){
            return res.status(500).send({
                success: false,
                message: 'You have not registered for the candidate'
            })
        }
        else if(candidate.status === 'pending'){
            return res.status(500).send({
                success: false,
                message: 'Your application is still under review. You have to be approved as a candidate to login as candidate.'
            })
        }

        // generate jwt token
        const token = await generateAuthToken(candidate._id, req.userType);

        req.user._doc['candidateId'] = candidate._id;
        // console.log('req.user in candidate login: ', req.user);

        res.status(200).send({
            success: true,
            message: 'Login Successfull',
            user: req.user,
            token,
        });
    } catch (error) {
        console.log(`Error in candidate login: ${error}`.bgRed.white);
        return res.status(500).send({
            success: false,
            message: 'Error in candidate login api',
            error
        });
    }
}