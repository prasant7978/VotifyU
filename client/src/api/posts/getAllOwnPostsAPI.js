import axios from "axios";

export const getAllOwnPostsAPI = async(token) => {
    try {
        const {data} = await axios.get(
            '/post/get-all-own-posts',
            {
                headers: {
                    'auth-token': token,
                    'Content-Type': 'application/json',
                },
            }
        );
        return data;
    } catch (error) {
        console.log('Error in getting all posts: ', error);
        return null;
    }
}