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

        const voteCountArr = position.results;

        // console.log('election results: ', voteCountArr);

        // check for vote tie
        let status
        if(voteCountArr.length > 1 && voteCountArr[0].voteCount === voteCountArr[1].voteCount)
            status = 'tie'
        else
            status = 'majority'

        return res.status(200).send({
            success: true,
            messgae: `Result Fetched for ${position.name}`,
            position: position.name,
            status: status,
            voteCountArr
        });
    } catch (error) {
        console.log('Error in view-election-results API: ', error);
        return res.status(500).send({
            success: false,
            message: 'Error in getting the election result',
            error
        });
    }
}