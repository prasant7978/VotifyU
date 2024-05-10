const candidateModel = require("../../models/candidateModel");

module.exports = async(req, res) => {
    try {
        // console.log('Student Id: ', req.id);
        // console.log('Request Body: ', req.body);
        // console.log('Request Files: ', req.files);

        const {slogan, position} = req.body;

        // validation
        if(!slogan || !position){
            return res.status(500).send({
                success: false,
                message: "Please provide complete information"
            });
        }

        // save candidate
        const candidate = await candidateModel({
            slogan: slogan,
            position: position,
            student: req.id,
            status: 'pending',
            aadharCard: req.files[0].filename,
            marksheet: req.files[1].filename,
            collegeIdCard: req.files[2].filename,
            hostelIdCard: req.files[3].filename,
        }).save();

        await candidate.populate('position', '_id name', 'Position');
        await candidate.populate('student', '_id name', 'Student');

        res.status(200).send({
            success: true,
            message: "candidate created",
            candidate
        })
    } catch (error) {
        console.log(`Error in apply-for-candidate api: ${error}`.bgRed.white);
        return res.status(500).send({
            success: false,
            message: 'Error in apply-for-candidate api',
            error
        });
    }
}