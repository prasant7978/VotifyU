import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({children}) => {
    // global state
    const [userState, setUserState] = useState({
        user: null,
        token: '',
        loginType: ''
    });

    // console.log('userState at auth context: ', userState);

    // default axios settings
    axios.defaults.baseURL = 'http://192.168.93.221:3001/api';
    
    // get initial storage data
    useEffect(() => {
        const loadLocalStorageData = async () => {
            try {
                const data = await AsyncStorage.getItem('@auth-data');
                // console.log('data from async storeage: ', data);
                if (data) {
                    const loginData = JSON.parse(data);
                    setUserState(prevState => ({
                      ...prevState,
                      user: loginData.user,
                      token: loginData.token,
                      loginType: loginData.loginType,
                    }));
                }
                else{
                    console.log('No data found in auth context...');
                    return;
                }
            } catch (error) {
                console.error('Error loading localStorage data:', error);
            }
        };
    
        loadLocalStorageData();
    }, []);
    
    return (
        <AuthContext.Provider value={[userState, setUserState]}>
            {children}
        </AuthContext.Provider>
    )
}

export {AuthContext, AuthProvider};