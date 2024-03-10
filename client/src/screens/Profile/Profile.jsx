import React, { useContext } from 'react'

import styles from './style'
import globalStyles from '../../assets/styles/globalStyles'

import { View, Text, Image } from 'react-native'

import FooterMenu from '../../components/Menus/FooterMenu'

import { AuthContext } from '../../context/aurhContext'
import InitialAvatar from '../../components/InitialAvatar/InitialAvatar'

const Profile = () => {
  const [userState, setUserState] = useContext(AuthContext); 

  return (
    <View style={[globalStyles.whiteBackground, globalStyles.flex]}>
      <View style={styles.profileContainer}>
        <View style={styles.topContainer}>
          <View style={styles.profileImageContainer}>
            {userState.user.profileImage ? (
              <Image
                source={{uri: `http://192.168.158.6:3001/api/uploads/profile/${userState.user.profileImage}`}}
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

          <View style={styles.userPrimaryDetailsContainer}>
            <Text style={styles.nameText}>{userState.user.name}</Text>
            <Text style={styles.emailText}>{userState.user.email}</Text>
            <Text style={styles.emailText}>{userState.user.roll}</Text>
        </View>
        </View>
      </View>

      <View>
        <FooterMenu/>
      </View>
    </View>
  )
}

export default Profile