import React, { useContext, useEffect, useState } from 'react'

import styles from './style'
import globalStyles from '../../assets/styles/globalStyles'

import { View, Text, Image, TextInput, ScrollView, Pressable, Alert, TouchableOpacity } from 'react-native'

import { Dropdown } from 'react-native-element-dropdown';
import DatePicker from 'react-native-date-picker'

import { AuthContext } from '../../context/authContext'

import AsyncStorage from "@react-native-async-storage/async-storage";

import InitialAvatar from '../../components/InitialAvatar/InitialAvatar'
import FooterMenu from '../../components/Menus/FooterMenu'
import Button from '../../components/Button/Button'

import { horizontalScale } from '../../assets/styles/scaling'
import { getFontFamily } from '../../assets/fonts/helper'

import { COLORS } from '../../constants/theme'
import { updateProfile } from '../../api/updateProfile';
import { Routes } from '../../navigation/Routes';

const Profile = ({navigation}) => {
  // global state
  const [userState, setUserState] = useContext(AuthContext); 

  // local states
  const [course, setCourse] = useState(userState.user.course);
  const [address, setAddress] = useState(userState.user.address);
  const [phone, setPhone] = useState(userState.user.phone);
  const [parentPhone, setParentPhone] = useState(userState.user.parentPhone);
  const [gender, setGender] = useState(userState.user.gender);
  const [dob, setDob] = useState(userState.user.dob);
  const [isLoading, setIsLoading] = useState(false);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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

  const handleUpdateProfile = async() => {
    const newDetails = {
      // profileImage: image,
      course: course,
      address: address,
      phone: phone,
      parentPhone: parentPhone,
      gender: gender,
      dob: dob
    }

    setIsLoading(true);
    const token = JSON.parse(await AsyncStorage.getItem('@auth-token'));
    const updatedProfile = await updateProfile(token, newDetails);
    setIsLoading(false);

    // console.log('received data: ', updatedProfile.data.updatedStudent);
    // console.log('received data: ', JSON.stringify(updatedProfile.data));
    // console.log('received user: ', JSON.stringify(updatedProfile.data.user));
    // console.log('received token: ', JSON.stringify(updatedProfile.data.token));

    if(!updatedProfile.status){
      Alert.alert('Alert', 'Error in updating the profile');
    }
    else{
      await AsyncStorage.setItem('@auth-data', JSON.stringify(updatedProfile.data));
      const newData = JSON.parse(await AsyncStorage.getItem('@auth-data'));
      // console.log('new data: ', newData);
      setUserState(prevState => ({ ...prevState, user: newData.user, token: newData.token }));
      // console.log('updated userState: ', userState);
      Alert.alert('Alert', 'Profile updated successfully');
    }
  }

  return (
    <View style={[globalStyles.whiteBackground, globalStyles.flex, {justifyContent: 'space-between'}]}>
      <ScrollView style={styles.profileContainer}>
        <View style={styles.userPrimaryDetailsContainer}>
          <View style={styles.profileImageContainer}>
            {userState.user.profileImage ? (
              <Image
                source={{uri: `http://192.168.156.96:3001/api/uploads/profile/${userState.user.profileImage}`}}
                style={styles.profileImage}
                resizeMode='cover'
              />
            ) : (
              <InitialAvatar
                name={userState.user.name}
                avatarSize={40} 
                textSize={16}
                padding={5}
              />
            )
          }
          </View>

          <View style={styles.userDetailsContainer}>
            <Text style={styles.nameText}>{userState.user.name}</Text>
            <Text style={styles.emailText}>{userState.user.email}</Text>
            <Text style={styles.emailText}>{userState.user.roll}</Text>
          </View>
        </View>

        <View style={styles.userSecondaryDetailsContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabelText}>Course</Text>
            <TextInput
              value={course}
              onChangeText={(val) => setCourse(val)}
              style={styles.inputBox}
              autoFocus={false}
              returnKeyType={'next'}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabelText}>Address</Text>
            <TextInput
              value={address}
              onChangeText={(val) => setAddress(val)}
              style={[styles.inputBox, styles.addressInputBox]}
              multiline={true}
              numberOfLines={3}
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
                  <Text style={[styles.modalText, styles.dobContainerText]}>{dob}</Text>
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

        {/* <View style={styles.userSecondaryDetailsContainer}>
          <View style={styles.changePasswordTextContainer}>
            <Text style={styles.changePasswordHeading}>Change Password</Text>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabelText}>New Password</Text>
            <TextInput
              value={newPassword}
              onChangeText={(val) => setNewPassword(val)}
              style={styles.inputBox}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabelText}>Confirm Password</Text>
            <TextInput
              value={confirmPassword}
              onChangeText={(val) => setConfirmPassword(val)}
              style={styles.inputBox}
            />
          </View>

          <View>
            <Button
              title={'Save Password'}
            />
          </View>
        </View> */}

        <View style={styles.updatePasswordContainer}>
          <TouchableOpacity onPress={() => navigation.navigate(Routes.UpdatePassword)}>
            <Text style={styles.updatePasswordText}>Update Password</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomContainer}>
          <Button
            title={'Update Profile'}
            loading={isLoading}
            handleSubmit={handleUpdateProfile}
          />
        </View>

      </ScrollView>

      <View>
        <FooterMenu/>
      </View>
    </View>
  )
}

export default Profile;