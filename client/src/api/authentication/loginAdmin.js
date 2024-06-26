import axios from "axios";

export const loginAdmin = async(employeeId, email, password) => {
    try {
        const {data} = await axios.post(
            '/auth/login/admin', 
            {
                employeeId,
                email, 
                password, 
                userType: 'admin'
            }
        );
        
        return {
            status: true,
            data
        };
    } catch (error) {
        console.log('Error in admin login: ', error.response.data.message);
        return {
            status: false,
            error: error.response.data.message
        };
    }
}
