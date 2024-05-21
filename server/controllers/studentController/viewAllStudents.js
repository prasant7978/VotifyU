const studentModel = require("../../models/studentModel");

module.exports = async(req, res) => {
    try {
        const students = await studentModel.find({}).sort({name: 1});

        if(!students){
            return res.status(500).send({
                success: false,
                message: 'No Students Were Found'
            })
        }

        for(let i=0; i<students.length; i++)
            students[i].password = undefined

        return res.status(200).send({
            success: true,
            message: 'All Students Have Been Fetched',
            students
        })
    } catch (error) {
        console.log('Error in view-all-students API: ', error);
        return res.status(500).send({
            success: false,
            message: 'Error in getting all students'
        })
    }
}