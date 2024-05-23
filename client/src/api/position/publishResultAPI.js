import axios from "axios";

const publishResultAPI = async(token, positionId) => {
    try {
        const {data} = await axios.put(
            `/position/publish-result?positionId=${positionId}`,
            {},
            {
                headers: {
                    'auth-token': token,
                    'Content-Type': 'application/json'
                }
            }
        )

        return data;
    } catch (error) {
        console.log('Error in publish-result API: ', error.response.data.message);
        return {
            error: error.response.data.message
        }
    }
}

export default publishResultAPI;