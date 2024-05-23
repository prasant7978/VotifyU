const positionModel = require('../../models/positionModel');

module.exports = async(req, res) => {
    try {
        const position = await positionModel.findById({_id: req.query.positionId});

        if(!position){
            return res.status(500).send({
                success: false,
                message: 'Position Not Found'
            })
        }

        var updatePosition
        if(req.body.status === 'open'){
            updatePosition = await positionModel.findByIdAndUpdate({_id: req.query.positionId}, {
                name: req.body.name || position.name,
                description: req.body.description || position.description,
                responsibilities: req.body.responsibilities || position.responsibilities,
                status: req.body.status || position.status,
                appliedCandidates: [],
                voteCount: [],
                studentVoted: [],
                results: [],
                electedCandidate: null,
            }, {new: true});
        }
        else{
            updatePosition = await positionModel.findByIdAndUpdate({_id: req.query.positionId}, {
                name: req.body.name || position.name,
                description: req.body.description || position.description,
                responsibilities: req.body.responsibilities || position.responsibilities,
                status: req.body.status || position.status
            }, {new: true});
        }


        if(!updatePosition){
            return res.status(500).send({
                success: false,
                message: 'We were unable to update the position.'
            })
        }

        return res.status(200).send({
            success: true,
            message: 'The Position Has Been Updated Successfully',
            position: updatePosition
        });
    } catch (error) {
        console.log('Error in update-position API: ', error);
        return {
            success: false,
            message: 'Erron in updating the position',
            error
        }
    }
}