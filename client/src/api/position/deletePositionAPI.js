import axios from "axios";

const deletePositionAPI = async(token, positionId) => {
    try {
        const {data} = await axios.delete(
            `/position/delete-position?positionId=${positionId}`,
            {
                headers: {
                    'auth-token': token,
                    'Content-Type': 'application/json',
                },
            }
        );
        
        return data;
    } catch (error) {
        console.log('Error in delete-position API: ', error.response.data.message);
        return {
            error: error.response.data.message
        }
    }
}

export default deletePositionAPI;