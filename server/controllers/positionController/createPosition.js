const positionModel = require("../../models/positionModel");
const generatePositionCode = require("../../functions/generatePositionCode");

module.exports = async(req, res) => {
    try {
        // validation
        if(!req.body.name || !req.body.description || !req.body.status){
            return res.status(500).send({
                success: false,
                message: 'Please provide all required details'
            });
        }

        // check if already exists
        const isExist = await positionModel.findOne({name: req.body.name})

        if(isExist){
            return res.status(500).send({
                success: false,
                message: 'A position with same name has been already added'
            });
        }

        const positionCode = generatePositionCode(req.body.name);

        const position = await positionModel({
            name: req.body.name,
            positionCode: positionCode,
            description: req.body.description,
            responsibilities: req.body.responsibilities,
            status: req.body.status,
        }).save();

        res.status(200).send({
            success: true,
            message: 'Position created successfully',
            position
        });
    } catch (error) {
        console.log(`Error in create-position api: ${error}`.bgRed.white);
        return res.status(500).send({
            success: false,
            message: 'Error in create-position api',
            error
        });
    }
}