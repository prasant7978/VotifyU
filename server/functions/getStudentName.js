const studentModel = require("../models/studentModel");

module.exports = async(studentId) => {
    try {
        // console.log('studentId: ', studentId);
        var student = await studentModel.findOne({_id: studentId});

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