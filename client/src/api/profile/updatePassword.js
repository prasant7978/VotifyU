import axios from "axios";

export const updatePassword = async(token, newPassword) => {
    try {
        const {data} = await axios.put(
            '/profile/update-password',
            {
                password: newPassword
            },
            {
                headers: {
                    'auth-token': token,
                    'Content-Type': 'application/json',
                },
            }
        );

        return {
            status: true,
            data
        }
    } catch (error) {
        console.log('Error in updating password: ', error);
        return {
            status: false,
            error
        };
    }
}