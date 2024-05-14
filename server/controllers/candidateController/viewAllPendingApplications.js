const candidateModel = require("../../models/candidateModel");

module.exports = async(req, res) => {
    try {
        const applications = await candidateModel.find({status: 'pending'});

        // populating the position and student attribute
        for(let i=0; i<applications.length; i++){
            applications[i] = await applications[i].populate('position', '_id name', 'Position');
            applications[i] = await applications[i].populate('student', '_id name profileImage', 'Student');
        }

        res.status(200).send({
            success: true,
            message: 'all candidate applications have been fetched',
            applications
        });
    } catch (error) {
        console.log(`Error in view-all-candidate-applications api: ${error}`.bgRed.white);
        return res.status(500).send({
            success: false,
            message: 'Error in view-all-candidate-applications api',
            error
        });
    }
}