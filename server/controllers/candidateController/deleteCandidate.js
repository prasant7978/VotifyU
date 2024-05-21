const postModel = require("../../models/postModel");
const candidateModel = require("../../models/candidateModel");

module.exports = async(req, res) => {
    try {
        if(req.userType != 'admin'){
            res.status(500).send({
                success: false,
                mesage: 'User is not authorized to delete candidate'
            });
        }

        // delete candidate
        const deletedCandidate = await candidateModel.findByIdAndDelete({_id: req.query.candidateId});

        if(!deletedCandidate){
            res.status(500).send({
                success: false,
                message: 'Candidate not found'
            });
        }

        // delete all posts related to the candidate
        await postModel.deleteMany({postedBy: req.query.candidateId});

        res.status(200).send({
            success: true,
            message: 'Candidate has been deleted successfully'
        });
    } catch (error) {
        console.log(`Error in delete-candidate api: ${error}`.bgRed.white);
        return res.status(500).send({
            success: false,
            message: 'Error in delete-candidate api',
            error
        });
    }
}