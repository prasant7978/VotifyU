const postModel = require("../../models/postModel");
const candidateModel = require("../../models/candidateModel");
const positionModel = require("../../models/positionModel");
const mongoose = require("mongoose");
const studentModel = require("../../models/studentModel");

module.exports = async(req, res) => {
    console.log('candidateId: ', req.query.candidateId);
    try {
        if(req.userType != 'admin'){
            res.status(500).send({
                success: false,
                mesage: 'User is not authorized to delete candidate'
            });
        }

        // const candidate = await candidateModel.findOne({_id: req.query.candidateId});

        // delete candidate
        const deletedCandidate = await candidateModel.findByIdAndDelete({_id: req.query.candidateId});

        if(!deletedCandidate){
            res.status(500).send({
                success: false,
                message: 'Candidate Not Found'
            });
        }

        // remove candidate from applied candidates and elected candidate from position document
        const convertedCandidateId = new mongoose.Types.ObjectId(req.query.candidateId)
        const updatePosition = await positionModel.findByIdAndUpdate({_id: deletedCandidate.position}, {
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

        // change user role from Candidate to Student
        const updatedStudent = await studentModel.findByIdAndUpdate({_id: deletedCandidate.student}, {
            role: 'Student'
        }, {new: true});

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