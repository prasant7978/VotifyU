import axios from "axios";

const addPositionAPI = async(token, position) => {
    try {
        const {data} = await axios.post(
            '/position/create-position',
            {
                name: position.name,
                description: position.description,
                status: position.status,
                responsibilities: position.responsibilities,
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
        console.log('Error in add-position API: ', error.response.data.message);
        return {
            error: error.response.data.message
        }
    }
}

export default addPositionAPI;