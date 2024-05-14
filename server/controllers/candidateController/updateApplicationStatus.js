const candidateModel = require("../../models/candidateModel");

module.exports = async(req, res) => {
    try {
        const candidateId = req.query.candidateId;
        const applicationStatus = req.body.applicationStatus;

        const updatedCandidate = await candidateModel.findByIdAndUpdate({_id: candidateId}, {
            status: applicationStatus
        }, {new: true});

        res.status(200).send({
            success: true,
            message: `The candidate application has been ${applicationStatus}.`,
            updatedCandidate
        });
    } catch (error) {
        console.log(`Error in accept-candidate-application api: ${error}`.bgRed.white);
        return res.status(500).send({
            success: false,
            message: 'Error in accept-candidate-application api',
            error
        });
    }
}