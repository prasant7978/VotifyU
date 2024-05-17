const positionModel = require("../../models/positionModel");

module.exports = async(req, res) => {
    try {
        const candidateId = req.body.candidateId;
        const positionId = req.body.positionId;
    
        // check if the position exist or not
        const position = await positionModel.findOne({_id: positionId});
        if(!position){
            return res.staus(500).send({
                success: false,
                message: 'Position Not Found'
            });
        }

        // check if the student had already submitted the vote for the position before
        const studentVoted = position.studentVoted?.includes(req.id);
        if(studentVoted){
            return res.status(500).send({
                success: false,
                message: 'You have already cast your vote for this position'
            });
        }

        // check if the candidateId is already present in the voteCount array
        const candidateExist = position.voteCount.find((candidate) => candidate.candidateId === candidateId)

        let updatedPosition;
        if(candidateExist){ // if exist, increment the count
            updatedPosition = await positionModel.findByIdAndUpdate({_id: positionId}, {
                $inc: {
                    'voteCount.$[elem].count': 1
                }
            }, {
                arrayFilters: [{
                    'elem.candidateId': candidateId
                }]
            });
        }
        else { // if doesn't exist, create new entry
            updatedPosition = await positionModel.findByIdAndUpdate({_id: positionId}, {
                $push: {
                    voteCount: {
                        candidateId,
                        count: 1
                    }
                }
            }, {new: true});

            // alternative approach
            // position.voteCount.push({ candidateId: candidateId, count: 1 });
            // await position.save();
        }

        if(!updatedPosition){
            return res.status(500).send({
                success: false,
                message: 'Error in updating voteCount'
            });
        }

        // add student id to student voted array
        updatedPosition = await positionModel.findByIdAndUpdate({_id: positionId}, {
            $push: {
                studentVoted: req.id
            }
        }, {new: true});
    
        return res.status(200).send({
          success: true,
          message: `Your vote submitted successfully for the ${position.name} position`
        });
      } catch (error) {
        console.error('Error in add-vote api:', error);
        return res.status(500).send({
          success: false,
          message: 'Error in adding vote to the position'
        });
      }   
}