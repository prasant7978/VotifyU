import axios from 'axios';

export const updateProfile = async(token, newProfileDetails) => {
    try{
        const {data} = await axios.put(
            '/profile/student/update-profile',
            {
                // profileImage: newProfileDetails.image,
                course: newProfileDetails.course,
                address: newProfileDetails.address,
                phone: newProfileDetails.phone,
                parentPhone: newProfileDetails.parentPhone,
                gender: newProfileDetails.gender,
                dob: newProfileDetails.dob
            },
            {
                headers: {
                    'auth-token': token,
                    'Content-Type': 'application/json',
                },
                params: {
                    type: 'profile',
                }
            }
        );

        return {
            status: true,
            data
        };
    } catch (error) {
        console.log('Error in update profile: ', error);
        return {
            status: false,
            error
        };
    }
}