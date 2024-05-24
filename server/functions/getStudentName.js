const candidateModel = require("../models/candidateModel");
const studentModel = require("../models/studentModel");

module.exports = async(id, type) => {
    try {
        var student
        if(type === 'profile'){
            student = await studentModel.findOne({_id: id});
        }
        else if(type === 'campaign'){
            const candidate = await candidateModel.findById({_id: id});
            student = await studentModel.findById({_id: candidate.student});
        }

        if(!student){
            console.log('Student not found in getStudentName');
            return null;
        }

        // console.log('student name: ', student?.name);

        return student?.name;
    } catch (error) {
        console.log('Error in getting student name: ', error);
        return null;
    }
}