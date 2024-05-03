const positionModel = require("../../models/positionModel");

module.exports = async (req, res) => {
    try {
        const {id} = req.query;
        console.log('position id: ', id);

        await positionModel.findByIdAndDelete({_id: id});

        res.status(200).send({
            success: true,
            message: "The position has been deleted successfully"
        })
    } catch (error) {
        console.log(`Error in delete-position api: ${error}`.bgRed.white);
        return res.status(500).send({
            success: false,
            message: 'Error in delete-position api',
            error
        });
    }
}