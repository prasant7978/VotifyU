const candidateModel = require("../../models/candidateModel");

module.exports = async(req, res) => {
    try {
        let candidate = await candidateModel.findOne({_id: req.query.candidateId});

        // populating the position and student attribute
        candidate = await candidate.populate('position', '_id name', 'Position');
        candidate = await candidate.populate('student', '_id name profileImage roll email phone course department gender', 'Student');

        res.status(200).send({
            success: true,
            message: 'candidate application have been fetched',
            candidate
        });
    } catch (error) {
        console.log(`Error in view-single-candidate-application api: ${error}`.bgRed.white);
        return res.status(500).send({
            success: false,
            message: 'Error in view-single-candidate-application api',
            error
        });
    }
}