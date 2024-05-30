import React, { useContext, useState } from "react";

import styles from "./style";
import globalStyles from "../../../assets/styles/globalStyles";

import { Alert, Image, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";

import { AuthContext } from "../../../context/authContext";

import { COLORS, imageUri } from "../../../constants/theme";
import DropShadow from "react-native-drop-shadow";
import Button from "../../../components/Button/Button";
import { Routes } from "../../../navigation/Routes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { updateProfileImageAPI } from "../../../api/profile/updateProfileImageAPI";
import { updateProfileAPI } from "../../../api/profile/updateProfileAPI";
import DocumentPicker from 'react-native-document-picker';
import { useFocusEffect } from "@react-navigation/native";
import getAllAdminPostsAPI from "../../../api/posts/getAllAdminPostAPI";
import CampaignCard from "../../../components/CampaignCard/CampaignCard";

const AdminProfile = ({navigation}) => {
    // global states
    const [userState, setUserState] = useContext(AuthContext);

    // local states
    const [name, setName] = useState(userState.user?.name);
    const [phone, setPhone] = useState(userState.user?.phone);
    const [email, setEmail] = useState(userState.user?.email);
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(null);
    const [ownPosts, setOwnPosts] = useState([]);

    useFocusEffect(
        React.useCallback(() => {
            async function fetchAllOwnPosts(){
                const {posts} = await getAllAdminPostsAPI(userState.token);
                setOwnPosts(posts);
            }

            fetchAllOwnPosts();
        }, [])
    );

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
        setLoading(true)
    
        try {
          const newDetails = {
            name: name,
            email: email,
            phone: phone,
          }
    
          const token = JSON.parse(await AsyncStorage.getItem('@auth-token'));
          const response = await updateProfileAPI(token, newDetails, 'admin');
          // console.log('response after updating profile details: ', response);
    
          if(!response.status){
            console.log('Error in updating the admin profile: ', response.error);
            Alert.alert('Error', response.error);
          }
          else{
            await AsyncStorage.setItem('@auth-data', JSON.stringify(response.data));
            const newData = JSON.parse(await AsyncStorage.getItem('@auth-data'));
            setUserState(prevState => ({
               ...prevState, 
               user: newData.user, 
               token: newData.token, 
               loginType: 'admin'
            }));
            Alert.alert('Alert', response.data.message);
          }
        } catch (error) {
          console.log('Error in updating the profile: ', error);
          Alert.alert('Error', error);
        } finally {
          setLoading(false)
        }
      }
    
      const handleUploadImage = async() => {
        setLoading(true)
    
        try {
          const {uri, name, type} = image;
    
          const formData = new FormData();
          formData.append('image', {
            uri,
            name,
            type
          });
    
          const token = JSON.parse(await AsyncStorage.getItem('@auth-token'));
          const response = await updateProfileImageAPI(token, formData, 'admin');
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
               loginType: 'admin'
            }));
            Alert.alert('Alert', 'Profile Image Updated Successfully');
          }
        } catch (error) {
          console.log('Error in updating the profile image: ', error);
          Alert.alert('Error', error);
        } finally {
          setLoading(false)
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
        if(!name || !email || !phone){
          Alert.alert('Alert', 'Please Provide All Details To Update The Profile')
          return;
        }
        else if(phone?.length != 10){
          Alert.alert('Alert', 'Please Enter A Valid Phone No.')
          return;
        }
    
        confirmDialog('details')
      }

    return (
        <SafeAreaView style={[globalStyles.flex, globalStyles.paddingHorizontal, globalStyles.whiteBackground]}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.topContainer}>
                    <DropShadow style={styles.imageShadow}>
                        {(userState.user?.profileImage && !image) ? (
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
                                    <View style={styles.profileImage}>
                                        <Image
                                            source={require('../../../assets/images/no-pictures.png')}
                                            style={styles.noImage}
                                            resizeMode={'contain'}
                                        />
                                    </View>
                                )}
                            </>                         
                        )}

                        <TouchableOpacity onPress={selectImage}>
                            <Image
                                source={require('../../../assets/images/pencil.png')}
                                style={styles.editImageIcon}
                            />
                        </TouchableOpacity>
                    </DropShadow>

                    {image && (
                        <TouchableOpacity style={styles.uploadImageButton} onPress={() => confirmDialog('image')}>
                            <Text style={styles.uploadImageButtonText}>Upload Image</Text>
                        </TouchableOpacity>
                    )}

                    <View style={styles.primaryDetailsContainer}>
                        <Text style={styles.candidateEmailText}>{userState.user?.email}</Text>

                        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                            <Text style={styles.labelText}>Employee Id: </Text>
                            <Text style={styles.detailsText}>{userState.user?.employeeId}</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.userSecondaryDetailsContainer}>
                    <View style={styles.inputContainer}>
                        <Text style={styles.labelText}>Name</Text>
                        <TextInput
                            value={name}
                            onChangeText={(val) => setName(val)}
                            style={styles.inputBox}
                            placeholder={'Enter Your Name'}
                            placeholderTextColor={COLORS.lightGray}
                            autoFocus={false}
                            returnKeyType={'next'}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.labelText}>Phone</Text>
                        <TextInput
                            value={phone}
                            onChangeText={(val) => setPhone(val)}
                            style={styles.inputBox}
                            placeholder={'Enter Your Mobile No.'}
                            placeholderTextColor={COLORS.lightGray}
                            autoFocus={false}
                            returnKeyType={'next'}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.labelText}>Email</Text>
                        <TextInput
                            value={email}
                            onChangeText={(val) => setEmail(val)}
                            style={styles.inputBox}
                            placeholder={'Enter Your Password'}
                            placeholderTextColor={COLORS.lightGray}
                            autoFocus={false}
                            returnKeyType={'next'}
                        />
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
                        loading={loading}
                        handleSubmit={validation}
                    />
                </View>

                <View style={styles.campaignListsContainer}>
                    <Text style={styles.conatainerHeadingText}>Campaigns</Text>

                    {ownPosts.length > 0 && (
                        <View style={styles.campaignContainer}>
                            {ownPosts.map((post) => {
                                return(
                                    <View key={post._id}>
                                        <CampaignCard post={post}/>
                                    </View>
                                )
                            })}
                        </View>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default AdminProfile;