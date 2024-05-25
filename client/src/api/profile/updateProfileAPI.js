import axios from 'axios';

export const updateProfileAPI = async(token, newDetails) => {
    try{
        const {data} = await axios.put(
            '/profile/student/update-profile',
            {
                course: newDetails.course,
                department: newDetails.department,
                phone: newDetails.phone,
                parentPhone: newDetails.parentPhone,
                gender: newDetails.gender,
                dob: newDetails.dob,
            },
            {
                headers: {
                    'auth-token': token,
                    'Content-Type': 'application/json',
                },
            }
        );

        return {
            status: true,
            data
        };
    } catch (error) {
        console.log('Error in update-profile API: ', error.response.data.message);
        return {
            status: false,
            error: error.response.data.message
        };
    }
}