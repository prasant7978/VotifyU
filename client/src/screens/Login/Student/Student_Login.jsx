import React, { useContext, useState } from "react";

// styles
import styles from "./style";
import globalStyles from "../../../assets/styles/globalStyles";

import { Alert, Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CheckBox from "@react-native-community/checkbox";

// assets
import { verticalScale } from "../../../assets/styles/scaling";

// componenets
import Heading from "../../../components/Heading/Heading";
import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";

// routes
import { Routes } from "../../../navigation/Routes";

// APIs
import { loginStudent } from "../../../api/authentication/loginStudent";

// auth context API
import { AuthContext } from "../../../context/authContext";
import { COLORS } from "../../../constants/theme";
import { loginCandidateAPI } from "../../../api/authentication/loginCandidateAPI";

const Student_Login = ({navigation}) => {
    // global state
    const [userState, setUserState] = useContext(AuthContext);
    // console.log('user state before login: ', userState);

    // local state
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState('');
    const [isCheckBoxSelected, setIsCheckBoxSelected] = useState(false);

    const handleLogin = async() => {

        if(!email || !password){
            Alert.alert('Alert', 'Please provide all details');
            return;
        }

        setIsLoading(true);

        let user = {};
        if(isCheckBoxSelected)
            user = await loginCandidateAPI(email, password);
        else
            user = await loginStudent(email, password);

        // console.log('user: ', user);
        
        if(!user.status){
            setError(user.error.response.data.message);
        }
        else{
            setError('');
            setUserState(user.data);
            await AsyncStorage.setItem('@auth-data', JSON.stringify(user.data));
            await AsyncStorage.setItem('@auth-token', JSON.stringify(user.data?.token));
            // console.log("user token at login: ",JSON.parse(await AsyncStorage.getItem('@auth-token')));
            // console.log("user data at login: ",JSON.parse(await AsyncStorage.getItem('@auth-data')));
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
                    <Heading title={'Student Login'} type={1}/>
                </View>

                <View style={styles.headingContainer}>
                    <Heading 
                        title={'Hi there! Your account misses you. \nLog in and let\'s catch up!'} 
                        type={3} 
                        color={'#000000'}
                    />
                </View>

                <View style={[styles.inputContainer, {marginTop: verticalScale(30)}]}>
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

                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <View style={styles.checkBoxContainer}>
                        <CheckBox
                            disabled={false}
                            value={isCheckBoxSelected}
                            onValueChange={(val) => setIsCheckBoxSelected(val)}
                            tintColors={{
                                true: COLORS.primary,
                                false: COLORS.primary
                            }}
                        />

                        <TouchableOpacity onPress={() => setIsCheckBoxSelected(!isCheckBoxSelected)}>
                            <Text style={styles.candidateLoginText}>Login as Candidate</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity>
                        <Text style={styles.forgotPasswordText}>Forgot your password?</Text>
                    </TouchableOpacity>
                </View>
                
                <View style={styles.buttonContainer}>
                    <Button
                        title={'Log In'}
                        loading={isLoading}
                        // isDisabled = {email.length < 5 || password.length < 6}
                        handleSubmit={handleLogin}
                    />
                </View>

                {error && <Text style={styles.errorText}>{error}</Text>}

                <TouchableOpacity style={styles.otherLoginText} onPress={() => navigation.navigate(Routes.Admin_Login)}>
                    <Heading title={'Login As Admin'} type={2} color={'#000000'}/>
                </TouchableOpacity>

            </ScrollView>
        </SafeAreaView>
    )
}

export default Student_Login;