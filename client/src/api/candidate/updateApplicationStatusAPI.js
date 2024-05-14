import axios from "axios";

const updateApplicationStatusAPI = async(token, candidateId, applicationStatus) => {
    try {
        const {data} = await axios.put(
            `candidate/update-application-status?candidateId=${candidateId}`,
            {
                applicationStatus: applicationStatus
            },
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
        console.log('Error in updating candidate application status api: ', error);
        return {
            status: false,
        };
    }
}

export default updateApplicationStatusAPI;