import axios from "axios";

const getSingleCandidateApplicationAPI = async(token, candidateId) => {
    try {
        const {data} = await axios.get(
            `/candidate/view-single-candidate-application?candidateId=${candidateId}`,
            {
                headers: {
                    'auth-token': token,
                    'Content-Type': 'application/json'
                },
            }
        );

        return {
            status: true,
            data
        }
    } catch (error) {
        console.log('Error in getting single candidate application api: ', error);
        return {
            status: false,
        };
    }
}

export default getSingleCandidateApplicationAPI;