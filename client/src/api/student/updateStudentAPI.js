import axios from 'axios';

export const updateStudentAPI = async(token, studentId, newStudentDetails) => {
    try{
        const {data} = await axios.put(
            `/student/update-student?studentId=${studentId}`,
            {
                name: newStudentDetails.name,
                gender: newStudentDetails.gender,
                dob: newStudentDetails.dob,
                phone: newStudentDetails.phone,
                parentPhone: newStudentDetails.parentPhone,
                roll: newStudentDetails.roll,
                email: newStudentDetails.email,
                course: newStudentDetails.course,
                department: newStudentDetails.department,
            },
            {
                headers: {
                    'auth-token': token,
                    'Content-Type': 'application/json',
                },
            }
        );
        
        return data;
    } catch (error) {
        console.log('Error in update-student API: ', error.response.data.message);
        return {
            error: error.response.data.message
        };
    }
}