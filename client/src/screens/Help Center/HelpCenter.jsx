import React from 'react'
import { View, Text, SafeAreaView, TouchableOpacity, Linking, Image } from 'react-native'
import globalStyles from '../../assets/styles/globalStyles'
import styles from './style'
import { verticalScale } from '../../assets/styles/scaling'

const HelpCenter = () => {
  const emailAddress = 'support.votifyU@gmail.com';
  const phoneNumber = '+918569742315';

  const handleEmailPress = () => {
    const mailtoLink = `mailto:${emailAddress}`;
    Linking.openURL(mailtoLink);
  };

  const handlePhonePress = () => {
    const phoneUrl = `tel:${phoneNumber}`;
    Linking.openURL(phoneUrl);
  };

  return (
    <SafeAreaView style={[globalStyles.flex, globalStyles.paddingHorizontal, globalStyles.whiteBackground, styles.container]}>
      <View>
        <View style={styles.imageContainer}>
          <Image
            source={require('../../assets/images/24-7.png')}
            style={styles.availabilityImage}
            resizeMode='cover'
          />

          <Image
            source={require('../../assets/images/customer-service.png')}
            style={styles.image}
            resizeMode='cover'
          />

          <Image
            source={require('../../assets/images/help.png')}
            style={styles.helpImage}
            resizeMode='cover'
          />
        </View>

        <Text style={[styles.containerHeading, {marginTop: verticalScale(30)}]}>About Us</Text>

        <Text style={styles.aboutUsText}>
          Empowering college students through an intuitive and secure voting experience, 
          our application ensures every voice is heard. 
          With user-friendly design and transparent processes, 
          we prioritize accessibility and trust. 
          Innovation is at the core, fostering community engagement beyond the ballot. 
          This is not just a voting platform; it's your channel to influence and shape the college experience. 
          Your choices matter, and our app is here to amplify your impact.
        </Text>
      </View>

      <View style={styles.studentSupportContainer}>
        <Text style={styles.containerHeading}>Student Support</Text>

        <Text style={styles.supportText}>
          For any inquiries or assistance, feel free to reach out to us. 
          Our dedicated team is here to help. 
          You can call us at below number or drop us an email. 
        </Text>

        <View style={styles.contactsContainer}>
          <Text style={styles.contactLabelText}>Email: </Text>

          <TouchableOpacity onPress={handleEmailPress} style={styles.link}>
            <Text style={[styles.contactDetailsText, styles.linkText]}>support.votifyU@gmail.com</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.contactsContainer, {marginTop: verticalScale(7)}]}>
          <Text style={styles.contactLabelText}>Mobile: </Text>

          <TouchableOpacity onPress={handlePhonePress} style={styles.link}>
            <Text style={[styles.contactDetailsText, styles.linkText]}>+91 8569742315</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={[styles.supportText, {marginTop: verticalScale(20)}]}>We value your feedback and are committed to providing prompt and reliable support. </Text>
      <Text style={[styles.supportText, {marginTop: verticalScale(15)}]}>Your satisfaction is our priority.</Text>

      
    </SafeAreaView>
  )
}

export default HelpCenter