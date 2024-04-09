import React, { useState } from "react";

import styles from "./styles";
import globalStyles from "../../assets/styles/globalStyles";

import { Alert, Image, ScrollView, Text, View } from "react-native";

import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";

import { updatePassword } from "../../api/updatePassword";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../../context/authContext";
import { Routes } from "../../navigation/Routes";
import { StackActions } from "@react-navigation/native";

const UpdatePassword = ({navigation}) => {
    // global states
    const [userState, setUserState] = useState(AuthContext);

    // local states
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleUpdatePassword = async() => {
        if(newPassword === confirmPassword){
            setError('');
            setLoading(true)
            const token = JSON.parse(await AsyncStorage.getItem('@auth-token'));
            const response = await updatePassword(token, newPassword);
            setLoading(false)

            // console.log('response: ', response);

            if(response.status){
                Alert.alert('Alert', response.data.message);
                navigation.goBack();
            }
            else{
                // Alert.alert('Alert', 'Something went wrong, please try again.');
                setError('Something went wrong, please try again.');
            }
        }
        else
            setError('The passwords you entered do not match.\nPlease try again.');
    }

    return (
        <View style={[globalStyles.flex, globalStyles.whiteBackground]}>
            <ScrollView style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image
                        source={require('../../assets/images/reset-password.png')}
                        resizeMode={"contain"}
                        style={styles.image}
                    />
                </View>

                <View style={styles.descriptionContainer}>
                    <Text style={styles.updatePasswordDescriptionText}>Create your new password for VotifyU so that you can login to your account</Text>
                </View>

                <View style={styles.newPasswordContainer}>
                    <Text style={styles.lableText}>New Password</Text>
                    <View style={styles.inputContainer}>
                        <Input
                            placeholder={'New Password'}
                            onTextChange={(val) => setNewPassword(val)}
                            secureTextEntry={true}
                        />
                    </View>
                </View>

                <View>
                    <Text style={styles.lableText}>Confirm Password</Text>
                    <View style={styles.inputContainer}>
                        <Input
                            placeholder={'Confirm Your Password'}
                            onTextChange={(val) => setConfirmPassword(val)}
                            secureTextEntry={true}
                        />
                    </View>
                </View>

                <View style={styles.bottonContainer}>
                    <Button
                        title={'Update Password'}
                        loading={loading}
                        handleSubmit={handleUpdatePassword}
                    />
                </View>

                {error && <Text style={styles.errorText}>{error}</Text>}
            </ScrollView>
        </View>
    )
}

export default UpdatePassword;