const positionModel = require("../../models/positionModel");

module.exports = async(req, res) => {
    try {
        const positions = await positionModel.find();

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