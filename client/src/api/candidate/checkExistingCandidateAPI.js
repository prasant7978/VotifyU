import axios from "axios";

const checkIfExistAPI = async (token) => {
    try {
        const {data} = await axios.get(
            '/candidate/check-if-exist',
            {
                headers: {
                    'auth-token': token,
                    'Content-Type': 'multipart/form-data',
                },
            }
        );

        return {
            status: true,
            data
        }
    } catch (error) {
        console.log('Error in check existing candidate api: ', error);
        return {
            status: false,
        };
    }
}

export default checkIfExistAPI;