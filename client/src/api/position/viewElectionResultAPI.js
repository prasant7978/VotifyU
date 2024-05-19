import axios from "axios";

const viewElectionResultAPI = async(token, positionId) => {
    try {
        const {data} = await axios.get(
            `/position/view-election-result?positionId=${positionId}`,
            {
                headers: {
                    'auth-token': token,
                    'Content-Type': 'application/json'
                },
            },
        );
        
        return data;
    } catch (error) {
        console.log('Error in view-election-result API: ', error.response.data.message);
        return error.response.data.message;
    }
}

export default viewElectionResultAPI;