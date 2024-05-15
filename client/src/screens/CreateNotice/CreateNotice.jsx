import React, { useState } from "react";

// styles
import styles from "./style";
import globalStyles from "../../assets/styles/globalStyles";

import { Alert, SafeAreaView, Text, TextInput, View } from "react-native";

import Button from "../../components/Button/Button";

import { COLORS } from "../../constants/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Snackbar from "react-native-snackbar";
import createNoticeAPI from "../../api/posts/createNoticeAPI";

const CreateNotice = () => {
    // local states
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);

    const handleCreateNotice = async() => {
        try {
            setLoading(true);
            const token = JSON.parse(await AsyncStorage.getItem('@auth-token'));
            const response = await createNoticeAPI(token, title, description);
      
            if(response.status){
              Snackbar.show({
                text: response.data.message,
                duration: Snackbar.LENGTH_SHORT,
                fontFamily: getFontFamily('Inter', '400')
              });
      
              navigation.goBack();
            }
            else{
              Alert.alert('Alert', response.error)
            }
          } catch (error) {
                console.log('Error in creating notice: ', error);
                Alert.alert('Alert', error)
          } finally {
                setLoading(false);
          }
    }

    const confirmDioalog = () => {
        Alert.alert(
          'Alert', 
          'Are you sure, you want to publish the notice?',
          [
            {
              text: 'Cancel',
              style: 'cancel'
            },
            {
              text: 'Submit',
              onPress: () => handleCreateNotice()
            }
          ],
          {
            cancelable: false
          }
        );
      }

    return (
        <SafeAreaView style={[globalStyles.flex, globalStyles.paddingHorizontal, globalStyles.whiteBackground]}>
            <View style={styles.titleInputBoxContainer}>
                <Text style={styles.lableText}>Title:</Text>

                <TextInput
                    style={styles.inputBox}
                    value={title}
                    onChangeText={(val) => setTitle(val)}
                    multiline={true}
                    autoFocus={false}
                    placeholder={'Write the title here...'}
                    placeholderTextColor={COLORS.darkGray}
                />
            </View>

            <View style={styles.descriptionInputBoxContainer}>
                <Text style={styles.lableText}>Description:</Text>

                <TextInput
                    style={[styles.inputBox, styles.descriptionInputBox]}
                    value={description}
                    onChangeText={(val) => setDescription(val)}
                    multiline={true}
                    autoFocus={false}
                    // placeholder={'Write about anything...'}
                    // placeholderTextColor={COLORS.darkGray}
                />
            </View>

            <View style={styles.buttonContainer}>
                <Button
                    title={'Publish Notice'}
                    loading={loading}
                    handleSubmit={confirmDioalog}
                />
            </View>
        </SafeAreaView>
    )
}

export default CreateNotice;