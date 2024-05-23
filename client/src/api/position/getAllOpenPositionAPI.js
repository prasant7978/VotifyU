import axios from "axios";

const getAllOpenPositionAPI = async(token, type) => {
    try {
        const {data} = await axios.get(
            '/position/view-all-open-positions',
            {
                headers: {
                    'auth-token': token,
                    'Content-Type': 'application/json',
                },
                params: {
                    type: type
                }
            },
        );
        
        return data;
    } catch (error) {
        console.log('Error in getting all open positions: ', error.response.data.message);
        return error.response.data.message;
    }
}

export default getAllOpenPositionAPI;