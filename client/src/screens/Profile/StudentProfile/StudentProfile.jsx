import React, { useContext, useEffect, useState } from 'react'

import { View, Text, Image, TextInput, ScrollView, Pressable, Alert, TouchableOpacity } from 'react-native'

import { Dropdown } from 'react-native-element-dropdown';
import DatePicker from 'react-native-date-picker'
import AsyncStorage from "@react-native-async-storage/async-storage";
import DocumentPicker from 'react-native-document-picker';

// imporitng styles
import styles from './style'
import globalStyles from '../../../assets/styles/globalStyles'

// importing user context api
import { AuthContext } from '../../../context/authContext'

// importing components
import InitialAvatar from '../../../components/InitialAvatar/InitialAvatar'
import FooterMenu from '../../../components/Menus/FooterMenu'
import Button from '../../../components/Button/Button'

// importing update profile api
import { updateProfileAPI } from '../../../api/profile/updateProfileAPI';
import { updateProfileImageAPI } from '../../../api/profile/updateProfileImageAPI';

// imporing assets
import { horizontalScale } from '../../../assets/styles/scaling'
import { getFontFamily } from '../../../assets/fonts/helper'

// importing colors
import { COLORS, imageUri } from '../../../constants/theme'

// importing navigation routes
import { Routes } from '../../../navigation/Routes';

const StudentProfile = ({navigation}) => {
  // global state
  const [userState, setUserState] = useContext(AuthContext); 

  // local states
  var [course, setCourse] = useState(userState.user.course);
  var [department, setDepartment] = useState(userState.user.department);
  var [phone, setPhone] = useState(userState.user.phone);
  var [parentPhone, setParentPhone] = useState(userState.user.parentPhone);
  var [gender, setGender] = useState(userState.user.gender);
  var [dob, setDob] = useState(userState.user.dob);
  var [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState(null);

  // dropdown visibility state
  const [isFocus, setIsFocus] = useState(false);

  // date picker state
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const genderList = [
    {label: "Male", value: "Male"},
    {label: "Female", value: "Female"},
  ];

  useEffect(() => {
    setUserState(userState);
  }, [userState])

  const selectImage = async() => {
    try {
      const file = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.images]
      });

      setImage(file);

      console.log('Image Selected: ', file);
    } catch (error) {
        console.log("Error in selecting the image: ", error);
    }
  }

  const handleUpdateProfile = async() => {
    setIsLoading(true)

    try {
      const newDetails = {
        course: course,
        department: department,
        phone: phone,
        parentPhone: parentPhone,
        gender: gender,
        dob: dob,
      }

      const token = JSON.parse(await AsyncStorage.getItem('@auth-token'));
      const response = await updateProfileAPI(token, newDetails, 'student');
      // console.log('response after updating profile details: ', response);

      if(!response.status){
        console.log('Error in updating the student profile: ', response.error);
        Alert.alert('Error', response.error);
      }
      else{
        await AsyncStorage.setItem('@auth-data', JSON.stringify(response.data));
        const newData = JSON.parse(await AsyncStorage.getItem('@auth-data'));
        setUserState(prevState => ({
           ...prevState, 
           user: newData.user, 
           token: newData.token, 
           loginType: 'student'
        }));
        Alert.alert('Alert', response.data.message);
      }
    } catch (error) {
      console.log('Error in updating the profile: ', error);
      Alert.alert('Error', error);
    } finally {
      setIsLoading(false)
    }
  }

  const handleUploadImage = async() => {
    setIsLoading(true)

    try {
      const {uri, name, type} = image;

      const formData = new FormData();
      formData.append('image', {
        uri,
        name,
        type
      });

      const token = JSON.parse(await AsyncStorage.getItem('@auth-token'));
      const response = await updateProfileImageAPI(token, formData, 'student');
      // console.log('response after updating profile image: ', response);

      if(!response.success){
        console.log('Error in updating the profile image: ', response.error);
        Alert.alert('Error', response.error);
      }
      else{
        await AsyncStorage.setItem('@auth-data', JSON.stringify(response));
        const newData = JSON.parse(await AsyncStorage.getItem('@auth-data'));
        setUserState(prevState => ({
           ...prevState, 
           user: newData.user, 
           token: newData.token, 
           loginType: 'student'
        }));
        Alert.alert('Alert', 'Profile Image Updated Successfully');
      }
    } catch (error) {
      console.log('Error in updating the profile image: ', error);
      Alert.alert('Error', error);
    } finally {
      setIsLoading(false)
    }
  }

  const confirmDialog = (type) => {
    if(type === 'details'){
      Alert.alert(
        'Update Profile Details', 
        'Are you sure, you want to update the profile details?',
        [
          {
            text: 'Cancel',
            style: 'cancel'
          },
          {
            text: 'Yes',
            onPress: () => handleUpdateProfile()
          }
        ],
        {
          cancelable: false
        }
      );
    }
    else{
      Alert.alert(
        'Update Profile Image', 
        'Are you sure, you want to update the profile image?',
        [
          {
            text: 'Cancel',
            style: 'cancel'
          },
          {
            text: 'Yes',
            onPress: () => handleUploadImage()
          }
        ],
        {
          cancelable: false
        }
      );
    }
  }

  const validation = () => {
    if(!course || !department || !gender || !dob || !phone || !parentPhone){
      Alert.alert('Alert', 'Please Provide All Details To Update The Profile')
      return;
    }
    else if(phone?.length != 10 || parentPhone?.length != 10){
      Alert.alert('Alert', 'Please Enter A Valid Phone No.')
      return;
    }

    confirmDialog('details')
  }

  return (
    <View style={[globalStyles.whiteBackground, globalStyles.flex, globalStyles.paddingHorizontal, {justifyContent: 'space-between'}]}>
      <ScrollView style={styles.profileContainer}>
        <View style={styles.userPrimaryDetailsContainer}>
          <View style={styles.profileImageContainer}>
            <TouchableOpacity onPress={selectImage}>
              {userState.user.profileImage && !image ? (
                <Image
                  source={{uri: `${imageUri}/profile/${userState.user.profileImage}`}}
                  style={styles.profileImage}
                  resizeMode='cover'
                />
              ) : (
                <>
                  {image ? (
                    <Image source={{ uri: image.uri }} style={styles.profileImage} />
                  ) : (
                    <InitialAvatar
                      name={userState.user.name}
                      avatarSize={90} 
                      textSize={28}
                      padding={5}
                    />
                  )}
                </>
              )}

              <TouchableOpacity onPress={selectImage}>
                <Image
                  source={require('../../../assets/images/pencil.png')}
                  style={styles.editImageIcon}
                />
              </TouchableOpacity>
            </TouchableOpacity>
          </View>

          <View style={styles.userDetailsContainer}>
            <Text style={styles.nameText}>{userState.user.name}</Text>
            <Text style={styles.emailText}>{userState.user.email}</Text>
            <Text style={styles.emailText}>{userState.user.roll}</Text>
          </View>
        </View>

        {image && (
          <TouchableOpacity style={styles.uploadImageButton} onPress={() => confirmDialog('image')}>
            <Text style={styles.uploadImageButtonText}>Upload Image</Text>
          </TouchableOpacity>
        )}

        <View style={styles.userSecondaryDetailsContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabelText}>Course</Text>
            <TextInput
              value={course}
              onChangeText={(val) => setCourse(val)}
              style={styles.inputBox}
              placeholder={'Enter Your Course'}
              placeholderTextColor={COLORS.lightGray}
              autoFocus={false}
              returnKeyType={'next'}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabelText}>Department</Text>
            <TextInput
              value={department}
              onChangeText={(val) => setDepartment(val)}
              style={styles.inputBox}
              placeholder={'Enter Your Department'}
              placeholderTextColor={COLORS.lightGray}
              autoFocus={false}
              returnKeyType={'next'}
            />
          </View>

          <View style={styles.flexRow}>
            <View style={[styles.inputContainer]}>
              <Text style={styles.inputLabelText}>Phone Number</Text>
              <TextInput
                value={phone}
                onChangeText={(val) => setPhone(val)}
                style={styles.inputBox}
                autoFocus={false}
                returnKeyType={'next'}
                keyboardType='phone-pad'
              />
            </View>

            <View style={[styles.inputContainer, {marginStart: horizontalScale(40)}]}>
              <Text style={styles.inputLabelText}>Parent Phone Number</Text>
                <TextInput
                  value={parentPhone}
                  onChangeText={(val) => setParentPhone(val)}
                  style={styles.inputBox}
                  placeholder={'Enter Mobile No.'}
                  placeholderTextColor={COLORS.lightGray}
                  autoFocus={false}
                  returnKeyType={'next'}
                  keyboardType='phone-pad'
                />
            </View>
          </View>

          <View style={styles.flexRow}>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabelText}>Gender</Text>

              <View style={styles.modalContainer}>
                <Dropdown
                  style={[styles.modal, isFocus && { borderColor: '#333333' }]}
                  containerStyle={styles.dropdownItemListContainer}
                  itemTextStyle={{color: COLORS.slateShadow}}
                  activeColor={COLORS.coffeeWhite}
                  placeholderStyle={styles.modalText}
                  selectedTextStyle={styles.modalText}
                  fontFamily={getFontFamily('Inter', '500')}
                  data={genderList}
                  labelField="label"
                  valueField="value"
                  placeholder={!isFocus ? 'Select gender' : '...'}
                  value={gender}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  onChange={item => {
                    setGender(item.value);
                    setIsFocus(false);
                  }}
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabelText}>Date of Birth</Text>
              
              <View style={[styles.modalContainer, styles.modal, styles.dateContainer]}>
                <Pressable onPress={() => (
                  setShowDatePicker(true)
                )}>
                  {dob ? (
                    <Text style={[styles.modalText, styles.dobContainerText]}>{dob}</Text>
                  ) : (
                    <Text style={[styles.modalText, styles.dobContainerText]}>N/A</Text>
                  )}
                </Pressable>  
              </View>
          
              {showDatePicker && (
                <DatePicker
                  modal
                  mode='date'
                  open={showDatePicker}
                  date={selectedDate}
                  androidVariant='nativeAndroid'
                  theme='light'
                  title={'Select Date'}
                  onConfirm={(date) => {
                    setSelectedDate(date)
                    setDob(date.toISOString().split('T')[0])
                    setShowDatePicker(false)
                  }}
                  onCancel={() => {
                    setShowDatePicker(false)
                  }}
                />
              )}
            </View>
          </View>

        </View>

        <View style={styles.updatePasswordContainer}>
          <TouchableOpacity onPress={() => navigation.navigate(Routes.UpdatePassword)}>
            <Text style={styles.updatePasswordText}>Update Password</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomContainer}>
          <Button
            title={'Update Profile'}
            loading={isLoading}
            handleSubmit={validation}
          />
        </View>
      </ScrollView>

      <View>
        <FooterMenu/>
      </View>
    </View>
  )
}

export default StudentProfile;