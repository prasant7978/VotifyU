const positionModel = require("../../models/positionModel");

module.exports = async(req, res) => {
    try {
        const positions = await positionModel.find({status: 'open'});

        if(!positions){
            return res.status(500).send({
                success: false,
                message: 'Positions not found'
            })
        }

        if(req.query.type === 'unvotedPositions'){
            const unvotedPositions = positions.filter((position) => !position.studentVoted.includes(req.id))
            return res.status(200).send({
                success: true,
                message: "All positions on which the user has not voted have been fetched.",
                positions: unvotedPositions
            })
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