const candidateModel = require("../../models/candidateModel");
const positionModel = require("../../models/positionModel");

module.exports = async(req, res) => {
    try {
        if(req.userType !== 'admin'){
            return res.status(500).send({
                success: false,
                message: 'User is not authorized to publish result'
            })
        }

        const position = await positionModel.findOne({_id: req.query.positionId});

        if(!position){
            return res.status(500).send({
                success: false,
                message: 'Position Not Found'
            });
        }

        if(position.voteCount.length === 0){
            return res.status(500).send({
                success: false,
                message: 'No votes have been cast yet. Please wait until voting is complete before publishing the results.'
            })
        }

        const voteCountArr = position.voteCount.sort((a, b) => b.count - a.count);

        let results = await Promise.all(voteCountArr.map(async(ele, index) => {
            if(ele.candidateId === "NOTA"){
                var result = {
                    id: 'NOTA',
                    name: "NOTA",
                    voteCount: ele.count,
                    rank: index + 1
                }
            }
            else{
                let candidate = await candidateModel.findOne({_id: ele.candidateId});
    
                // populating the student attribute
                candidate = await candidate.populate('student', '_id name profileImage', 'Student');
    
                result = {
                    id: candidate.student._id,
                    name: candidate.student.name,
                    profileImage: candidate.student.profileImage,
                    voteCount: ele.count,
                    rank: index + 1
                }
            }

            return result;
        }));

        // console.log('results: ', results);

        // check for vote tie
        let status
        if(results.length > 1 && results[0].voteCount === results[1].voteCount){
            status = 'tie'

            const updatePosition = await positionModel.findByIdAndUpdate({_id: req.query.positionId}, {
                appliedCandidates: [],
                studentVoted: [],
                status: 'close',
                voteCount: [],
                results: results
            }, {new: true});
    
            if(!updatePosition){
                return res.status(500).send({
                    success: false,
                    message: 'Error in updating the position'
                })
            }
        }
        else{
            status = 'majority'

            const updatePosition = await positionModel.findByIdAndUpdate({_id: req.query.positionId}, {
                electedCandidate: voteCountArr[0].candidateId === 'NOTA' ? null : voteCountArr[0].candidateId,
                appliedCandidates: [],
                studentVoted: [],
                status: 'close',
                voteCount: [],
                results: results
            }, {new: true});

            if(!updatePosition){
                return res.status(500).send({
                    success: false,
                    message: 'Error in updating the position'
                })
            }

            console.log('updated position: ', updatePosition);
        }

        // delete other candidates except electedCandidate if any
        if(voteCountArr[0].candidateId !== 'NOTA' && (voteCountArr.length > 1 && voteCountArr[0].count !== voteCountArr[1].count)){
            const deleteCandidates = await candidateModel.deleteMany({
                position: req.query.positionId,
                _id: {
                    $ne: voteCountArr[0].candidateId
                }
            })
        }

        return res.status(200).send({
            success: true,
            message: `Result Published for ${position.name}`,
        });
    } catch (error) {
        console.log('Error in publish-result API: ', error);
        return res.status(500).send({
            success: false,
            message: 'Error in publishing the result',
            error
        })
    }
}