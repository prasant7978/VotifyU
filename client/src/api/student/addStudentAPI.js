import axios from "axios";

const addStudentAPI = async(token, student) => {
    try {
        const {data} = await axios.post(
            '/student/add-student',
            {
                name: student.name,
                roll: student.roll,
                email: student.email,
                phone: student.phone
            },
            {
                headers: {
                    'auth-token': token,
                    'Content-Type': 'application/json'
                },
            }
        )

        return data;
    } catch (error) {
        console.log('Error in add-student API: ', error.response.data.message);
        return {
            error: error.response.data.message
        }
    }
}

export default addStudentAPI;