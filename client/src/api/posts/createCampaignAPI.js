import axios from "axios";

const createCampaignAPI = async(token, formData) => {
    try {
        const {data} = await axios.post(
            '/post/create-post/campaign',
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
        }
    } catch (error) {
        console.log('Error in create campaign api: ', error.response.data.message);
        return {
            status: false,
            error: error.response.data.message
        }
    }
}

export default createCampaignAPI;