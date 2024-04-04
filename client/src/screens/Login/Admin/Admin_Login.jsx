import React, { useContext, useState } from "react";

import styles from "./style";
import globalStyles from "../../../assets/styles/globalStyles";

import { Alert, Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";

import { verticalScale } from "../../../assets/styles/scaling";

import Heading from "../../../components/Heading/Heading";
import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";

import { loginAdmin } from "../../../api/loginAdmin";

import { AuthContext } from "../../../context/authContext";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Routes } from "../../../navigation/Routes";

const Admin_Login = ({navigation}) => {
    // global state
    const [userState, setUserState] = useContext(AuthContext);

    // local state
    const [employeeId, setEmployeeId] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState('');

    const handleLogin = async() => {

        if(!employeeId || !email || !password){
            Alert.alert('Alert', 'Please provide all details');
            return;
        }

        setIsLoading(true);

        const user = await loginAdmin(employeeId, email, password);

        // console.log('user: ', user);
        
        if(!user.status){
            setError(user.error.response.data.message);
        }
        else{
            setError('');
            setUserState(user.data);
            await AsyncStorage.setItem('@auth-data', JSON.stringify(user.data));
            await AsyncStorage.setItem('@auth-token', JSON.stringify(user.data?.token));
            // Alert.alert(user.data && user.data.message);
            // navigation.navigate(Routes.Feeds);
        }

        setIsLoading(false);
    }

    return (
        <SafeAreaView style={[globalStyles.whiteBackground, globalStyles.flex]}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
                <View style={styles.logoContainer}>
                    <Image 
                        source={require('../../../assets/images/nitc_logo.png')} 
                        resizeMode={"contain"}
                        style={styles.logo}
                    />
                </View>
                
                <View style={styles.headingContainer}>
                    <Heading title={'Admin Login'} type={1}/>
                </View>

                <View style={styles.headingContainer}>
                    <Heading 
                        title={'Good to see you again! \nEnter your credentials to access your account.'} 
                        type={3} 
                        color={'#000000'}
                    />
                </View>

                <View style={[styles.inputContainer, {marginTop: verticalScale(30)}]}>
                    <Input
                        placeholder={'Employee Id'}
                        onTextChange={(val) => setEmployeeId(val)}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Input
                        placeholder={'Email'}
                        onTextChange={(val) => setEmail(val)}
                        keyboardType={'email-address'}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Input
                        placeholder={'Password'}
                        onTextChange={(val) => setPassword(val)}
                        secureTextEntry={true}
                    />
                </View>

                <TouchableOpacity>
                    <Text style={styles.forgotPasswordText}>Forgot your password?</Text>
                </TouchableOpacity>
                
                <View style={styles.buttonContainer}>
                    <Button
                        title={'Log In'}
                        loading={isLoading}
                        // isDisabled = {email.length < 5 || password.length < 6}
                        handleSubmit={handleLogin}
                    />
                </View>

                {error && <Text style={styles.errorText}>{error}</Text>}

                <TouchableOpacity style={styles.otherLoginText} onPress={() => navigation.goBack()}>
                    <Heading title={'Login As Student'} type={2} color={'#000000'}/>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Admin_Login;