import axios from "axios";

const getAllPositionAPI = async(token, type) => {
    try {
        const {data} = await axios.get(
            `/position/view-all-positions?type=${type}`,
            {
                headers: {
                    'auth-token': token,
                    'Content-Type': 'application/json',
                },
            }
        );
        
        return data;
    } catch (error) {
        console.log('Error in getting all positions: ', error.response.data.message);
        return error.response.data.message;
    }
}

export default getAllPositionAPI;