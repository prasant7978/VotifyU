import axios from 'axios';

export const updateProfileImageAPI = async(token, formData, userType) => {
    try{
        const {data} = await axios.put(
            `/profile/${userType}/upload-profile-image`,
            formData,
            {
                headers: {
                    'auth-token': token,
                    'Content-Type': 'multipart/form-data',
                },
                params: {
                    type: 'profile',
                }
            }
        );

        return data;
    } catch (error) {
        console.log('Error in upload-profile-image API: ', error.response.data.message);
        return {
            error: error.response.data.message
        };
    }
}