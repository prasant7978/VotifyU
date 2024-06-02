import React, { useContext, useState } from 'react';

import { Alert, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

// styles
import styles from './style';
import globalStyles from '../../assets/styles/globalStyles';

import Snackbar from 'react-native-snackbar';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// components
import Button from '../../components/Button/Button';

// fonts and scale
import { verticalScale } from '../../assets/styles/scaling';
import { getFontFamily } from '../../assets/fonts/helper';

// api
import { updatePost } from '../../api/posts/updatePost';
import deletePostAPI from '../../api/posts/deletePostAPI';

// all posts context api
import { PostContext } from '../../context/postContext';
import { AuthContext } from '../../context/authContext';
import { imageUri } from '../../constants/theme';

const UpdateCampaign = ({navigation}) => {
    // global state
    const [userState] = useContext(AuthContext);

    const route = useRoute();
    const post = route.params?.post;

    const [, , fetchAllPosts] = useContext(PostContext);

    const [title, setTitle] = useState(post.type === 'notice' ? post.title : '');
    const [description, setDescription] = useState(post.description);
    const [loading, setLoading] = useState(false);
    const [isDisable, setIsDisable] = useState(userState.loginType === 'student')
    
    const fetchUpdatedData = async () => {
        await fetchAllPosts('update page');
    };

    const handleDeletePost = async() => {
        setLoading(true)

        try {
            const token = JSON.parse(await AsyncStorage.getItem('@auth-token'));
            const response = await deletePostAPI(token, post._id);

            if(!response.success){
                console.log('Error in deleting the post: ', response.message);
                Alert.alert('Error', response.message);
                return;
            }

            Snackbar.show({
                text: 'The Post Has Been Deleted Successfully',
                duration: Snackbar.LENGTH_SHORT,
                fontFamily: getFontFamily('Inter', '400')
            });
            navigation.goBack();
        } catch (error) {
            console.log('Error in deleting post: ', error);
            Alert.alert('Error', error);
        } finally {
            setLoading(false)
        }
    }

    const handleUpdatePost = async() => {
        const token = JSON.parse(await AsyncStorage.getItem('@auth-token'));
        
        const newPost = {
            id: post._id,
            type: post.type,
            title: title,
            description: description
        }

        setLoading(true);
        const updatedPost = await updatePost(token, newPost);
        setLoading(false);

        if(updatedPost.status){
            // fetch the updated posts
            fetchUpdatedData();

            Snackbar.show({
                text: 'The post has been updated successfully',
                duration: Snackbar.LENGTH_SHORT,
                fontFamily: getFontFamily('Inter', '400')
            })
        }
        else
            Alert.alert('Alert', 'Error in updating the post.\nPlease try again later.')
    }

    const confirmDialogueBox = (type) => {
        if(type === 'update'){
            Alert.alert(
                'Update Post', 
                'Are you sure you want to update this post?',
                [
                    {
                        text: 'Cancel',
                        style: 'cancel'
                    },
                    {
                        text: 'OK',
                        onPress: () => handleUpdatePost()
                    }
                ],
                {
                    cancelable: true
                }
            );
        }
        else{
            Alert.alert(
                'Delete Post', 
                'Are you sure you want to delete the post?',
                [
                  {
                    text: 'Cancel',
                    style: 'cancel'
                  },
                  {
                    text: 'OK',
                    onPress: () => handleDeletePost()
                  }
                ],
                {
                  cancelable: true
                }
            );
        }
    }

    return (
        <ScrollView style={[globalStyles.flex, globalStyles.whiteBackground, globalStyles.paddingHorizontal]} scrollEnabled={true} showsVerticalScrollIndicator={true}>
            {post.type === 'notice' ? (
                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabelText}>Title</Text>
                    <>
                        {isDisable ? (
                            <Text style={styles.titleInputBox}>{title}</Text>
                        ) : (
                            <TextInput
                                value={title}
                                onChangeText={(val) => setTitle(val)}
                                style={styles.titleInputBox}
                                multiline={true}
                                autoFocus={false}
                                returnKeyType={'next'}
                            />
                        )}
                    </>
                </View>
            ) : (
                <Image
                    source={{uri: `${post.imageUrl}`}}
                    style={styles.campaignImage}
                />
            )}

            <View style={styles.inputContainer}>
                <Text style={[styles.inputLabelText, {paddingTop: verticalScale(10)}]}>Description</Text>
                {isDisable ? (
                    <Text style={[styles.descriptionInputBox, styles.multiLineInputBox]}>{description}</Text>
                ) : (
                    <TextInput
                        value={description}
                        onChangeText={(val) => setDescription(val)}
                        style={[styles.descriptionInputBox, styles.multiLineInputBox]}
                        multiline={true}
                        autoFocus={false}
                        returnKeyType={'next'}
                    />
                )}
            </View>

            {(userState.loginType === 'admin' || (userState.loginType === 'candidate' && userState.user.candidateId === post.postedBy)) && (
                <View style={styles.buttonContainer}>
                    <Button
                        title={'Update Post'}
                        loading={loading}
                        handleSubmit={() => confirmDialogueBox('update')}
                    />

                    <TouchableOpacity style={styles.deleteButton} onPress={() => confirmDialogueBox('delete')} disabled={loading}>
                        <Text style={styles.deleteButtonText}>Delete Post</Text>
                    </TouchableOpacity>
                    
                </View>
            )}
        </ScrollView>
    )
}

export default UpdateCampaign;