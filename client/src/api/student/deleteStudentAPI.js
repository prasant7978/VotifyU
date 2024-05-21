import axios from "axios";

const deleteStudentAPI = async(token, studentId) => {
    try {
        const {data} = await axios.delete(
            `/student/delete-student?studentId=${studentId}`,
            {
                headers: {
                    'auth-token': token,
                    'Content-Type': 'application/json'
                },
            },
        )

        return data;
    } catch (error) {
        console.log('Error in delete-student API: ', error.resposnse.data.message);
        return {
            error: error.resposnse.data.message
        }
    }
}

export default deleteStudentAPI;