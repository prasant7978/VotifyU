const positionModel = require("../models/positionModel");

module.exports = async (positionId, candidateId) => {
  try {
    const updatedPosition = await positionModel.findOneAndUpdate({ _id: positionId },
        { 
            $pull: { 
                appliedCandidates: candidateId 
            } 
        }, { new: true });

    if (!updatedPosition)
      return false;

    return true;
  } catch (error) {
    console.error(`Error in remove-candidate-from-position api: ${error}`);
    return false; 
  }
};
