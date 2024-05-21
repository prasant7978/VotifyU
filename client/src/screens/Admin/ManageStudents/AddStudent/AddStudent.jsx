import React, { useState } from "react";

// styles
import styles from "./style";
import globalStyles from "../../../../assets/styles/globalStyles";

import { Alert, Image, ScrollView, Text, TextInput, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { COLORS } from "../../../../constants/theme";

import Button from "../../../../components/Button/Button";

// APIs
import addStudentAPI from "../../../../api/student/addStudentAPI";

const AddStudent = () => {
    const [name, setName] = useState('');
    const [roll, setRoll] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const clearInputText = () => {
        setName('');
        setRoll('');
        setEmail('');
        setPhone('');
    }

    const handleAddStudent = async() => {
        setIsLoading(true)

        try {
            const student = {
                name: name,
                roll: roll,
                email: email,
                phone: phone
            }

            const token = JSON.parse(await AsyncStorage.getItem('@auth-token'))
            const response = await addStudentAPI(token, student)

            if(!response.success){
                console.log('Error in adding the student: ', response.error);
                Alert.alert('Error', response.error)
                return
            }

            Alert.alert('Alert', response.message)
            clearInputText();
        } catch (error) {
            console.log('Error in deleting student: ', error);
            Alert.alert('Error', error)
        } finally {
            setIsLoading(false)
        }
    }

    const confirmDioalog = () => {
        Alert.alert(
            'Add Student', 
            'Are you sure, you want to add the student?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel'
                },
                {
                    text: 'Yes',
                    onPress: () => handleAddStudent()
                }
            ],
            {
                cancelable: false
            }
        );
    }

    const validation = () => {
      if (
        !name ||
        !roll ||
        !phone ||
        !email
      ) {
        Alert.alert('Alert', 'Please Provide All Information');
        return;
      }

      confirmDioalog();
    };

    return (
        <ScrollView style={[globalStyles.flex, globalStyles.paddingHorizontal, globalStyles.whiteBackground]}>
            <View style={styles.imageContainer}>
                <Image
                    source={require('../../../../assets/images/add-group.png')}
                    style={styles.image}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.labelText}>Name</Text>

                <TextInput
                    value={name}
                    onChangeText={(val) => setName(val)}
                    placeholder={'Student Name'}
                    placeholderTextColor={COLORS.lightGray}
                    style={styles.inputText}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.labelText}>Registration No.</Text>

                <TextInput
                    value={roll}
                    onChangeText={(val) => setRoll(val)}
                    placeholder={'Student Registration No.'}
                    placeholderTextColor={COLORS.lightGray}
                    style={styles.inputText}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.labelText}>Email</Text>

                <TextInput
                    value={email}
                    onChangeText={(val) => setEmail(val)}
                    placeholder={'Student Institute Email'}
                    placeholderTextColor={COLORS.lightGray}
                    style={styles.inputText}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.labelText}>Mobile Number</Text>

                <TextInput
                    value={phone}
                    onChangeText={(val) => setPhone(val)}
                    placeholder={'Student Mobile Number'}
                    placeholderTextColor={COLORS.lightGray}
                    style={styles.inputText}
                />
            </View>

            <View style={styles.buttonContainer}>
                <Button
                    title={'Add Student'}
                    loading={isLoading}
                    handleSubmit={validation}
                />
            </View>
        </ScrollView>
    )
}

export default AddStudent