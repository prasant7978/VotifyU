const positionModel = require("../../models/positionModel");
const candidateModel = require("../../models/candidateModel");

module.exports = async(req, res) => {
    try {
        const position = await positionModel.findOne({_id: req.query.positionId});

        if(!position){
            return res.status(500).send({
                success: false,
                message: 'Position Not Found'
            });
        }

        const voteCountArr = position.voteCount.sort((a, b) => b.count - a.count);

        let results = await Promise.all(voteCountArr.map(async(ele, index) => {
            if(ele.candidateId === "NOTA"){
                var result = {
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
                    name: candidate.student.name,
                    profileImage: candidate.student.profileImage,
                    voteCount: ele.count,
                    rank: index + 1
                }
            }

            return result;
        }));

        // console.log('election results: ', results);

        // check for vote tie
        let status
        if(results.length > 1 && results[0].voteCount === results[1].voteCount)
            status = 'tie'
        else
            status = 'majority'

        return res.status(200).send({
            success: true,
            messgae: `Result Fetched for ${position.name}`,
            position: position.name,
            status: status,
            results
        });
    } catch (error) {
        console.log('Error in publish-vote API: ', error);
        return res.status(500).send({
            success: false,
            message: 'Error in publishing the election result',
            error
        });
    }
}