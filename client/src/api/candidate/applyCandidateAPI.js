import axios from "axios"

const applyCandidateAPI = async(formData, token) => {
    try {
        const {data} = await axios.post(
            '/candidate/apply-for-candidate',
            formData,
            {
                headers: {
                    'auth-token': token,
                    'Content-Type': 'multipart/form-data',
                },
            }
        );

        return {
            status: true,
            data
        };
    } catch (error) {
        console.log('Error in candidate apply api: ', error);
        return {
            status: false,
        };
    }
}

export default applyCandidateAPI;