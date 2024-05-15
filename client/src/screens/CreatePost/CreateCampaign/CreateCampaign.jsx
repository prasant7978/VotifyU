import React, { useState } from 'react'

// styles
import styles from './style';
import globalStyles from '../../../assets/styles/globalStyles'

// components
import { View, Text, TouchableOpacity, SafeAreaView, Image, TextInput, ScrollView, Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import DocumentPicker from 'react-native-document-picker';
import Snackbar from 'react-native-snackbar';

// font awesome icon
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import { horizontalScale } from '../../../assets/styles/scaling';
import { getFontFamily } from '../../../assets/fonts/helper';

import Button from '../../../components/Button/Button';

import { COLORS } from '../../../constants/theme';

// APIs
import createCampaignAPI from '../../../api/posts/createCampaignAPI';

const CreateCampaign = ({navigation}) => {
  // local states
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const selectImage = async() => {
    try {
      const file = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.images]
      });

      setImage(file);
      setFileName(file.name)

      console.log('Image Selected: ', file);
    } catch (error) {
        console.log("Error in selecting the image: ", error);
    }
  }

  const confirmDioalog = () => {
    if(!image){
      Alert.alert('Alert', 'Please select an image for posting');
      return;
    }
    else if(!description){
      Alert.alert('Alert', 'Please provide some description for the post');
      return;
    }

    Alert.alert(
      'Alert', 
      'Are you sure, you want to publish the campaign?',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Submit',
          onPress: () => handleCreateCampaign()
        }
      ],
      {
        cancelable: false
      }
    );
  }

  const handleCreateCampaign = async() => {
    try {
      const {uri, name, type} = image;

      const formData = new FormData();
      formData.append('image', {
        uri,
        name,
        type
      });
      formData.append('description', description);

      setLoading(true);
      const token = JSON.parse(await AsyncStorage.getItem('@auth-token'));
      const response = await createCampaignAPI(token, formData);

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
      console.log('Error in creating campaign: ', error);
      Alert.alert('Alert', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={[globalStyles.flex, globalStyles.paddingHorizontal, globalStyles.whiteBackground]}>
        <ScrollView>
          <View style={styles.chooseFileContainer}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.labelText}>Choose a file:</Text>
              <Text style={styles.fileNameText}>{fileName}</Text>
            </View>

            <TouchableOpacity style={[styles.componenetStyle, styles.imageContainer]} onPress={() => selectImage()}>
            {image ? (
                <Image source={{ uri: image.uri }} style={styles.componenetStyle} />
              ) : (
                <FontAwesomeIcon icon={faPlus} size={horizontalScale(35)} />
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.inputBoxContainer}>
            <Text style={styles.labelText}>Description:</Text>

            <TextInput 
              style={[styles.inputBox]}
              value={description}
              onChangeText={(val) => setDescription(val)}
              multiline={true}
              autoFocus={false}
              placeholder={'Write something about the post...'}
              placeholderTextColor={COLORS.darkGray}
            />
          </View>

          <View style={styles.buttonContainer}>
            <Button
              title={'Publish Campaign'}
              loading={loading}
              handleSubmit={confirmDioalog}
            />
          </View>
        </ScrollView>
    </SafeAreaView>
  )
}

export default CreateCampaign