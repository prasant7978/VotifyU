import axios from "axios";

export const updatePost = async(token, post) => {
    try{
        if(post.type === 'notice'){
            const {data} = await axios.put(
                '/post/update-post/notice',
                {
                    title: post.title,
                    description: post.description
                },
                {
                    headers: {
                        'auth-token': token,
                        'Content-Type': 'application/json',
                    },
                    params: {
                        id: post.id,
                    }
                }
            );

            return {
                status: true,
                data
            };
        }
        else{
            const {data} = await axios.put(
                '/post/update-post/campaign',
                {
                    description: post.description
                },
                {
                    headers: {
                        'auth-token': token,
                        'Content-Type': 'application/json',
                    },
                    params: {
                        id: post.id,
                    }
                }
            );

            return {
                status: true,
                data
            };
        }
    } catch (error) {
        console.log('Error in update post: ', error);
        return {
            status: false,
            error
        };
    }
}