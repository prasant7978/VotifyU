const adminModel = require("../models/adminModel");
const candidateModel = require("../models/candidateModel");
const studentModel = require("../models/studentModel");

module.exports = async(id, type, userType) => {
    try {
        var user
        if(type === 'profile'){
            if(userType === 'student')
                user = await studentModel.findOne({_id: id});
            else
                user = await adminModel.findById({_id: id});
        }
        else if(type === 'campaign'){
            if(userType === 'student'){
                const candidate = await candidateModel.findById({_id: id});
                user = await studentModel.findById({_id: candidate.student});
            }
            else
                user = await adminModel.findById({_id: id});     
        }
        else{
            if(userType === 'student')
                user = await studentModel.findOne({_id: id});
            else
                user = await adminModel.findById({_id: id});
        }

        if(!user){
            console.log('User not found in getUserName');
            return null;
        }

        return user?.name;
    } catch (error) {
        console.log('Error in getting user name: ', error);
        return null;
    }
}