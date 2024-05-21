import axios from "axios";

const viewAllStudentsAPI = async(token) => {
    try {
        const {data} = await axios.get(
            '/student/view-all-students',
            {
                headers: {
                    'auth-token': token,
                    "Content-Type": 'application/json'
                },
            },
        )

        return data
    } catch (error) {
        console.log('Error in view-all-students API: ', error.response.data.message);
        return error.response.data.message
    }
}

export default viewAllStudentsAPI