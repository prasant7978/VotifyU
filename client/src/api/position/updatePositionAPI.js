import axios from "axios";

const updatePositionAPI = async(token, newPosition) => {
    try {
        const {data} = await axios.put(
            `/position/update-position?positionId=${newPosition.positionId}`,
            {
                positionId: newPosition.positionId,
                name: newPosition.name,
                description: newPosition.description,
                responsibilities: newPosition.responsibilities,
                status: newPosition.status
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
        console.log('Error in update-position API: ', error.response.data.message);
        return {
            error: error.response.data.message
        }
    }
}

export default updatePositionAPI;