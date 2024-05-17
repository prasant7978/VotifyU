import axios from "axios";

const submitVote = async(token, candidateId, positionId) => {
    try {
        const {data} = await axios.post(
            '/position/add-vote',
            {
                positionId,
                candidateId
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
        console.log('Error in add-vote api: ', error.response.data.message);
        return error.response.data.message;
    }
}

export default submitVote;