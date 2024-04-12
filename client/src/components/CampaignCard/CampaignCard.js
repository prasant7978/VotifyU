import React from 'react'
import styles from './style'
import { View, Text, Image, Pressable } from 'react-native'

const CampaignCard = ({post}) => {
  return (
    <Pressable 
      style={styles.campaignContainer} 
      onPress={() => console.log(post._id)}
    >
        {post.type === 'campaign' ? (
            <Image
                source={{uri: `http://192.168.156.96:3001/api/uploads/campaign/${post.image}`}}
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