import axios from "axios";

export const getAllPostsAPI = async(token) => {
    try {
        const {data} = await axios.get('/post/get-all-posts',{
            headers: {
                'auth-token': token,
                'Content-Type': 'application/json',
            },
        });

        return data;
    } catch (error) {
        console.log('Error in getting all posts: ', error);
        return null;
    }
}