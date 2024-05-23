const postModel = require("../../models/postModel");
const candidateModel = require("../../models/candidateModel");
const positionModel = require("../../models/positionModel");
const mongoose = require("mongoose");

module.exports = async(req, res) => {
    console.log('candidateId: ', req.query.candidateId);
    try {
        if(req.userType != 'admin'){
            res.status(500).send({
                success: false,
                mesage: 'User is not authorized to delete candidate'
            });
        }

        const candidate = await candidateModel.findOne({_id: req.query.candidateId});

        // delete candidate
        const deletedCandidate = await candidateModel.findByIdAndDelete({_id: req.query.candidateId});

        if(!deletedCandidate){
            res.status(500).send({
                success: false,
                message: 'Candidate not found'
            });
        }

        // remove candidate from applied candidates and elected candidate from position document
        const convertedCandidateId = new mongoose.Types.ObjectId(req.query.candidateId)
        console.log('converted candidate Id: ', convertedCandidateId);
        const updatePosition = await positionModel.findByIdAndUpdate({_id: candidate.position}, {
            $pull: {
                appliedCandidates: convertedCandidateId
            },
            $pull: {
                voteCount: {
                    candidateId: req.query.candidateId
                }
            },
            $unset: {
                electedCandidate: 1
            },
        }, {new: true}).exec();

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