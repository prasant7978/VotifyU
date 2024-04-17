import React, { useState } from 'react';
import { Alert, Image, ScrollView, Text, TextInput, View } from 'react-native';
import styles from './style';
import { useRoute } from '@react-navigation/native';
import globalStyles from '../../assets/styles/globalStyles';
import Button from '../../components/Button/Button';
import { verticalScale } from '../../assets/styles/scaling';
import { updatePost } from '../../api/posts/updatePost';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Snackbar from 'react-native-snackbar';
import { getFontFamily } from '../../assets/fonts/helper';

const UpdateCampaign = () => {
    const route = useRoute();
    const post = route.params?.post;

    const [title, setTitle] = useState(post.type === 'notice' ? post.title : '');
    const [description, setDescription] = useState(post.description);
    const [loading, setLoading] = useState(false);

    const confirmDialogueBox = () => {
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
        // console.log('updated post: ', updatedPost);
        setLoading(false);

        if(updatedPost.status){
            Snackbar.show({
                text: 'The post has been updated successfully',
                duration: Snackbar.LENGTH_SHORT,
                fontFamily: getFontFamily('Inter', '400')
            })
        }
        else
            Alert.alert('Alert', 'Error in updating the post.\nPlease try again later.')
    }

    return (
        <ScrollView style={[globalStyles.flex, globalStyles.whiteBackground, globalStyles.paddingHorizontal]} scrollEnabled={true} showsVerticalScrollIndicator={true}>
            {post.type === 'notice' ? (
                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabelText}>Title</Text>
                    <TextInput
                        value={title}
                        onChangeText={(val) => setTitle(val)}
                        style={[styles.titleInputBox,]}
                        multiline={true}
                        autoFocus={false}
                        returnKeyType={'next'}
                    />
                </View>
            ) : (
                <Image
                    source={{uri: `http://192.168.156.96:3001/api/uploads/campaign/${post.image}`}}
                    style={styles.campaignImage}
                />
            )}

            <View style={styles.inputContainer}>
                <Text style={[styles.inputLabelText, {paddingTop: verticalScale(10)}]}>Description</Text>
                <TextInput
                    value={description}
                    onChangeText={(val) => setDescription(val)}
                    style={[styles.descriptionInputBox, styles.multiLineInputBox]}
                    multiline={true}
                    autoFocus={false}
                    returnKeyType={'next'}
                />
            </View>

            <View style={styles.buttonContainer}>
                <Button
                    title={'Update Post'}
                    loading={loading}
                    handleSubmit={confirmDialogueBox}
                />
            </View>
        </ScrollView>
    )
}

export default UpdateCampaign;