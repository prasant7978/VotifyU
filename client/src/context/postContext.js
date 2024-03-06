import { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const PostContext = createContext();

const PostProvider = ({children}) => {
    const navigation = useNavigation();

    const [allPosts, serAllPosts] = useState([]);
    // console.log('All Posts: \n', allPosts);

    const getAllPosts = async() => {
        try {
            const token = JSON.parse(await AsyncStorage.getItem('auth-token'));

            // console.log('token at context: ', token);

            if (!token) {
                console.error('Token not found. Unable to make the request. Please login again.');
                return;
            }

            const {data} = await axios.get('/post/get-all-posts',{
                headers: {
                    'auth-token': token,
                    'Content-Type': 'application/json',
                },
            });
            // console.log('all posts: ', data?.posts);
            serAllPosts(data?.posts);
        } catch (error) { 
            console.log('Error in getting all posts: ', error);
        }
    }

    useEffect(() => {
        getAllPosts();
    }, [])

    return (
        <PostContext.Provider value={[allPosts, serAllPosts]}>
            {children}
        </PostContext.Provider>
    )
}

export {PostContext, PostProvider};