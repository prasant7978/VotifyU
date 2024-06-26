const candidateModel = require("../../models/candidateModel");

module.exports = async(req, res) => {
    try {
        const candidateApplications = await candidateModel.find({student: req.id}).sort({createdAt: -1});
        const candidate = candidateApplications[0];

        if(!candidate){
            return res.status(200).send({
                success: true,
                isExist: false,
                message: 'Candidate not found'
            })
        }

        console.log('candidate found');

        await candidate.populate('position', '_id name', 'Position');

        return res.status(200).send({
            success: true,
            isExist: true,
            message: 'Candidate already exists',
            candidate
        })
    } catch (error) {
        console.log(`Error in check-if-already-exist api: ${error}`.bgRed.white);
        return res.status(500).send({
            success: false,
            message: 'Error in check-if-already-exist api',
            error
        });
    }
}