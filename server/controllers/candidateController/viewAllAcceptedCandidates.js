const candidateModel = require("../../models/candidateModel");

module.exports = async(req, res) => {
    try {
        const candidates = await candidateModel.find({status: 'accepted'});

        // populating the position and student attribute
        for(let i=0; i<candidates.length; i++){
            candidates[i] = await candidates[i].populate('position', '_id name', 'Position');
            candidates[i] = await candidates[i].populate('student', '_id name profileImage', 'Student');
        }

        res.status(200).send({
            success: true,
            message: 'all candidates have been fetched',
            candidates
        });
    } catch (error) {
        console.log(`Error in view-all-accepted-candidates api: ${error}`.bgRed.white);
        return res.status(500).send({
            success: false,
            message: 'Error in view-all-accepted-candidates api',
            error
        });
    }
}