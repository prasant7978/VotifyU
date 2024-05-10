import axios from "axios";

const getAllPositionAPI = async(token) => {
    try {
        const {data} = await axios.get(
            '/position/view-all-positions',
            {
                headers: {
                    'auth-token': token,
                    'Content-Type': 'application/json',
                },
            }
        );
        
        return data;
    } catch (error) {
        console.log('Error in getting all positions: ', error);
        return null;
    }
}

export default getAllPositionAPI;