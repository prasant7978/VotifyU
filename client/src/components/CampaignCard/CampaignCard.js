import React from 'react'
import styles from './style'
import { View, Text, Image, Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Routes } from '../../navigation/Routes'

const CampaignCard = ({post}) => {
  const navigation = useNavigation();

  return (
    <Pressable 
      style={styles.campaignContainer} 
      onPress={() => navigation.navigate(Routes.UpdateCampaign, {post: post})}
    >
        {post.type === 'campaign' ? (
            <Image
                source={{uri: `http://192.168.93.221:3001/api/uploads/campaign/${post.image}`}}
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