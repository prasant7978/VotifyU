import axios from "axios";

const deletePostAPI = async(token, postId) => {
    try {
        const {data} = await axios.delete(
            `/post/delete-post?postId=${postId}`,
            {
                headers: {
                    'auth-token': token,
                    'Content-Type': 'application/json'
                },
            },
        )

        return data;
    } catch (error) {
        console.log('Error in delete-post API: ', error.response.data.message);
        return {
            error: error.response.data.message
        }
    }
}

export default deletePostAPI;