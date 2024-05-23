const candidateModel = require("../../models/candidateModel");
const positionModel = require("../../models/positionModel");

module.exports = async(req, res) => {
    try {
        let positions = await positionModel.find({});

        if(!positions){
            return res.status(500).send({
                success: false,
                message: 'Positions not found'
            })
        }

        // populate elected candidate
        for(let i=0; i<positions.length; i++){
            let candidate = await candidateModel.findOne({_id: positions[i].electedCandidate});
            
            if(candidate){
                candidate = await candidate.populate('student', '_id name profileImage', 'Student');

                positions[i]._doc['candidate'] = {
                    candidateId: candidate._id,
                    studentId: candidate.student._id,
                    name: candidate.student.name,
                    profileImage: candidate.student.profileImage
                }
            }
        }

        res.status(200).send({
            success: true,
            message: "All positions have been fetched",
            positions
        })
    } catch (error) {
        console.log(`Error in view-all-position api: ${error}`.bgRed.white);
        return res.status(500).send({
            success: false,
            message: 'Error in view-all-position api',
            error
        });
    }
}