const addCandidatetoPosition = require("../../functions/addCandidatetoPosition");
const removeCandidateFromPosition = require("../../functions/removeCandidateFromPosition");
const candidateModel = require("../../models/candidateModel");
const studentModel = require("../../models/studentModel");

module.exports = async(req, res) => {
    try {
        const candidateId = req.query.candidateId;
        const applicationStatus = req.body.applicationStatus;

        var updatedCandidate = await candidateModel.findByIdAndUpdate({_id: candidateId}, {
            status: applicationStatus
        }, {new: true});

        if(updatedCandidate && updatedCandidate.status === 'accepted'){
            // add candidate to appliedCandidates in position
            const updatePosition = await addCandidatetoPosition(updatedCandidate.position, candidateId);

            if(!updatePosition){
                updatedCandidate = await candidateModel.findByIdAndUpdate({_id: candidateId}, {
                    status: 'pending'
                }, {new: true});

                return res.status(500).send({
                    success: false,
                    message: 'Error in adding candidate to the postion'
                });
            }

            console.log('candidate has been added to the postion');

            // change user role from Student to Candidate
            const updatedStudent = await studentModel.findByIdAndUpdate({_id: updatedCandidate.student}, {
                role: 'Candidate'
            }, {new: true});

            if(!updatedStudent){
                await removeCandidateFromPosition(positionId, candidateId)
                    .then((removed) => {
                        if (removed) {
                            console.log("Candidate removed successfully!");
                        } else {
                            console.error("Error removing candidate or position not found.");
                        }
                    })
                    .catch((error) => {
                        console.error("Unexpected error:", error);
                    });

                updatedCandidate = await candidateModel.findByIdAndUpdate({_id: candidateId}, {
                    status: 'pending'
                }, {new: true});

                return res.status(500).send({
                    success: false,
                    message: 'Error in changing user role to Candidate'
                });
            }
        }

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