import React, { useContext } from 'react'

import styles from './style'
import globalStyles from '../../assets/styles/globalStyles'

import { View, Text, SafeAreaView } from 'react-native'

import FooterMenu from '../../components/Menus/FooterMenu'

import { AuthContext } from '../../context/aurhContext'

const Profile = () => {
  const [userState, setUserState] = useContext(AuthContext); 

  return (
    <SafeAreaView style={[globalStyles.whiteBackground, globalStyles.flex]}>
      <View style={styles.profileContainer}>
        <Text style={{color: '#000000'}}>Profile</Text>

        <View style={styles.topContainer}>
          <View style={styles.avatarImageContainer}>
            {post.postedBy.profileImage ? (
              <Image
                source={{uri: `http://192.168.158.6:3001/api/uploads/profile/${userState.profileImage}`}}
                style={styles.avatarImage}
                resizeMode='cover'
              />
            ) : (
              <InitialAvatar 
                name={post.postedBy.name} 
                avatarSize={40} 
                textSize={16}
                padding={5}
              />
            )
          }
          </View>
        </View>
      </View>

      <FooterMenu/>
    </SafeAreaView>
  )
}

export default Profile