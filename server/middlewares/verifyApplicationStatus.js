const candidateModel = require("../models/candidateModel");

module.exports = async(req, res, next) => {
    try {
        const candidateId = req.id;
        // console.log('candiate id: ', candidateId);

        const candidate = await candidateModel.findOne({_id: candidateId});
        // console.log('candidate: ', candidate);

        if(!candidate){
            console.log('candidate not found');
            return res.status(500).send({
                success: false,
                message: 'You need to be a candidate first for publishing any post.'
            });
        }

        if(candidate.status === 'accepted'){
            console.log('Application verified...');
            next();
        }
        else {
            return res.status(500).send({
                success: false,
                message: 'Your application is still under review. You have to be approved as a candidate to publish'
            });
        }
    } catch (error) {
        console.log(`Error in verifying the candidate application: ${error}`.bgRed.white);
        return res.status(500).send({
            success: false,
            message: 'Error in verifying the candidate application',
            error
        });
    }
}