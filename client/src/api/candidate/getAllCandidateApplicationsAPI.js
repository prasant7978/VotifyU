import axios from "axios";

const getAllCandidateApplicationsAPI = async(token) => {
    try {
        const {data} = await axios.get(
            '/candidate/view-pending-candidate-applications',
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
        console.log('Error in getting all candidate applications api: ', error);
        return {
            status: false,
        };
    }
}

export default getAllCandidateApplicationsAPI;