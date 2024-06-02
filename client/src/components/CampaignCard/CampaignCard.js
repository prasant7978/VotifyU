import React, { useContext } from 'react'

import styles from './style'

import { View, Text, Image, Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { Routes } from '../../navigation/Routes'

import { imageUri } from '../../constants/theme'

const CampaignCard = ({post}) => {
  const navigation = useNavigation();

  return (
    <Pressable 
      style={styles.campaignContainer} 
      onPress={() => {navigation.navigate(Routes.UpdateCampaign, {post: post})}}
    >
        {(post.type === 'campaign' && post?.image) ? (
            <Image
                source={{uri: `${post.imageUrl}`}}
                style={styles.campaignImage}
            />
            ) : (
              <View style={[styles.campaignImage, styles.titleContainer]}>
                <Text style={styles.titleText}>{post.title}</Text>
              </View>
            )
        }
    </Pressable>
  )
}

export default CampaignCard