import React, { useState } from "react";

import styles from "./style";
import globalStyles from "../../../assets/styles/globalStyles";

import { Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";

import { verticalScale } from "../../../assets/styles/scaling";

import Heading from "../../../components/Heading/Heading";
import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";
import { Routes } from "../../../navigation/Routes";

const Student_Login = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

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

                <TouchableOpacity>
                    <Text style={styles.forgotPasswordText}>Forgot your password?</Text>
                </TouchableOpacity>
                
                <View style={styles.buttonContainer}>
                    <Button
                        title={'Log In'}
                        // isDisabled = {email.length < 5 || password.length < 6}
                        onPress={() => {

                        }}
                    />
                </View>

                <TouchableOpacity style={{alignItems: 'center'}} onPress={() => navigation.navigate(Routes.Admin_Login)}>
                    <Heading title={'Login As Admin'} type={2} color={'#000000'}/>
                </TouchableOpacity>

                {error.length > 0 && <Text style={styles.errorText}>{error}</Text>}
            </ScrollView>
        </SafeAreaView>
    )
}

export default Student_Login;