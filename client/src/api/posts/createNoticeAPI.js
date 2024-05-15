import axios from "axios";

const createNoticeAPI = async(token, title, description) => {
    try {
        const {data} = await axios.post(
            '/post/create-post/notice',
            {
                title: title,
                description: description
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
        console.log('Error in create notice api: ', error.response.data.message);
        return {
            status: false,
            error: error.response.data.message
        }
    }
}

export default createNoticeAPI;