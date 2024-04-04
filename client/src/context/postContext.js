import { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { getAllPostsAPI } from "../api/getAllPostsAPI";
import { AuthContext } from "./authContext";
import { ActivityIndicator, View } from "react-native";

const PostContext = createContext();

const PostProvider = ({children}) => {
    const navigation = useNavigation();

    const [userState] = useContext(AuthContext);
    const [allPosts, setAllPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    // console.log('All Posts in post context: ', allPosts);

    const fetchAllPosts = async(from) => {
        // console.log('calling....', from);
        // console.log('User State in post context: ', userState);
        // console.log("user data at post context: ",JSON.parse(await AsyncStorage.getItem('@auth-data')));
        try {
            const token = userState.token;
            // const token = JSON.parse(await AsyncStorage.getItem('@auth-token'));

            console.log('token at context: ', token);

            if (!token) {
                console.log('Token not found. Unable to make the request. Please login...');
                setLoading(false);
                return;
            }

            const data = await getAllPostsAPI(token);
            // console.log('all posts: ', data?.posts);

            setAllPosts(data?.posts);
            setLoading(false);
        } catch (error) { 
            console.log('Error in getting all posts: ', error);
            setLoading(false);
        }
    }

    const resetAllPosts = () => {
        setAllPosts([]);
    };

    useEffect(() => {
        fetchAllPosts('context');
    }, []);

    if(loading){
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        )
    }

    return (
        <PostContext.Provider value={[allPosts, setAllPosts, fetchAllPosts, resetAllPosts]}>
            {children}
        </PostContext.Provider>
    )
}

export {PostContext, PostProvider};