import axios from "axios";

const deleteCandidateAPI = async(token, candidateId) => {
    try {
        const {data} = await axios.delete(
            `/candidate/delete-candidate?candidateId=${candidateId}`,
            {
                headers: {
                    'auth-token': token,
                    'Content-Type': 'application/json'
                },
            },
        )
        
        return data;
    } catch (error) {
        console.log('Error in delete-candidate API: ', error.resposnse.data.message);
        return {
            error: error.resposnse.data.message
        }
    }
}

export default deleteCandidateAPI;