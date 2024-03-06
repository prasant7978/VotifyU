import axios from "axios";

export const loginAdmin = async(employeeId, adminEmail, adminPassword) => {
    try {
        const {data} = await axios.post(
            '/auth/login/admin', 
            {
                employeeId,
                adminEmail, 
                adminPassword, 
                userType: 'admin'
            }
        );
        // console.log('success data: ', data);
        return {
            status: true,
            data
        };
    } catch (error) {
        console.log('Error in admin login: ', error.response.data.message);
        return {
            status: false,
            error
        };
    }
}
