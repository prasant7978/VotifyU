const positionModel = require("../../models/positionModel");

module.exports = async(req, res) => {
    try {
        const position = await positionModel.findByIdAndUpdate({_id: req.body.positionId}, {
            electedCandidate: req.body.candidateId
        }, {new: true});

        if(!position){
            return res.status(500).send({
                success: false,
                message: 'Error in assigning winner candidate'
            })
        }

        return res.status(200).send({
            success: true,
            message: 'Candidate assigned as elected candidate',
            position
        })
    } catch (error) {
        console.log('Error in assign-winner-candidate API: ', error);
        return res.status(500).send({
            success: false,
            messgae: 'Error in assign-winner-candidate API',
            error
        })
    }
}