import React from "react";
import styles from "./style";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import globalStyles from "../../assets/styles/globalStyles";

const Login = () => {
    return (
        <SafeAreaView style={[globalStyles.whiteBackground, globalStyles.flex]}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View>
                    <Text style={{color: '#000000'}}>Login</Text>
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}

export default Login;