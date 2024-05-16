const positionModel = require("../models/positionModel");

module.exports = async(positionId, candidateId) => {
    try {
        // var position = await positionModel.findOne({_id: positionId});
        // // position not found
        // if(!position)
        //     return false;
        // position.appliedCandidates.push(candidateId);
        // const updatedPosition = await position.save();

        const updatedPosition = await positionModel.findByIdAndUpdate({_id: positionId}, 
            {
                $push: {
                    appliedCandidates: candidateId
                }
            }, {new: true}
        );

        if(updatedPosition)
            return true;
        else // position not found
            return false;
    } catch (error) {
        console.log(`Error in add-candidate-to-position api: ${error}`.bgRed.white);
        return false;
    }
}