import axios from "axios";

const getAllAdminPostsAPI = async(token) => {
    try {
        const {data} = await axios.get(
            '/post/get-all-admin-posts',
            {
                headers: {
                    'auth-token': token,
                    'Content-Type': 'application/json',
                },
            }
        );
        
        return data;
    } catch (error) {
        console.log('Error in getting all posts: ', error.response.data.message);
        return {
            error: error.response.data.message
        };
    }
}

export default getAllAdminPostsAPI;