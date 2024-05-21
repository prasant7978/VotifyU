import axios from "axios";

const getAllAcceptedCandidatesAPI = async(token) => {
    try {
        const {data} = await axios.get(
            '/candidate/view-all-accepted-candidates',
            {
                headers: {
                    'auth-token': token,
                    'Content-Type': 'application/json'
                },
            }
        );

        return data
    } catch (error) {
        console.log('Error in getting all accepted candidates api: ', error.response.data.message);
        return {
            error: error.response.data.message
        };
    }
}

export default getAllAcceptedCandidatesAPI;