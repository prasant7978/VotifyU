import React from 'react'
import styles from './style'
import { View, Text, Image } from 'react-native'
import InitialAvatar from '../InitialAvatar/InitialAvatar'
import { imageUri } from '../../constants/theme'

const PostCard = ({post}) => {

  return (
    <View style={styles.postContainer}>
      <View style={styles.topContainer}>
        <View style={styles.avatarImageContainer}>
          {post.postedBy.imageUrl ? (
            <Image
              source={{uri: `${post.postedBy.imageUrl}`}}
              style={styles.avatarImage}
              resizeMode='cover'
            />
          ) : (
            <InitialAvatar 
              name={post.postedBy?.name} 
              avatarSize={40} 
              textSize={16}
              padding={5}
            />
          )
        }
        </View>
  
        <View style={styles.userDetailsContainer}>
            <Text style={styles.nameText}>{post.postedBy?.name}</Text>
            <Text style={styles.roleText}>
              {post.userType === 'admin' ? post.postedBy.role : post.positionApplied}
            </Text>
        </View>
      </View>

      <View style={styles.middleContainer}>
        {post.type === 'campaign' ? (
            <Image
                source={{uri: `${post.imageUrl}`}}
                style={styles.campaignImage}
                resizeMode='cover'
            />
          ) : (
            <Text style={styles.titleText}>{post.title}</Text>
          )
        }
      </View>

      <View style={styles.descriptionTextContainer}>
        <Text style={styles.descriptionText}>{post.description}</Text>
      </View>
    </View>
  )
}

export default PostCard