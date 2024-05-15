import axios from "axios";

export const loginCandidateAPI = async(email, password) => {
    try {
        const {data} = await axios.post(
            '/auth/login/candidate', 
            {
                email, 
                password, 
                userType: 'student'
            }
        );
        // console.log('success data: ', data);
        return {
            status: true,
            data
        };
    } catch (error) {
        console.log('Error in candidate login: ', error.response.data.message);
        return {
            status: false,
            error
        };
    }
}
