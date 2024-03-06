import axios from "axios";

export const loginStudent = async(studentEmail, studentPassword) => {
    try {
        const {data} = await axios.post(
            '/auth/login/student', 
            {
                studentEmail, 
                studentPassword, 
                userType: 'student'
            }
        );
        // console.log('success data: ', data);
        return {
            status: true,
            data
        };
    } catch (error) {
        console.log('Error in student login: ', error.response.data.message);
        return {
            status: false,
            error
        };
    }
}
