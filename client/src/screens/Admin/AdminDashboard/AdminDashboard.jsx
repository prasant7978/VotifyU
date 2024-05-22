import React from 'react';

// styles
import styles from './style';
import globalStyles from '../../../assets/styles/globalStyles';

import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import DropShadow from 'react-native-drop-shadow';

import {horizontalScale, verticalScale} from '../../../assets/styles/scaling';

import {Routes} from '../../../navigation/Routes';

import FooterMenu from '../../../components/Menus/FooterMenu';

const AdminDashboard = ({navigation}) => {
  return (
    <SafeAreaView
      style={[
        globalStyles.flex,
        globalStyles.paddingHorizontal,
        globalStyles.whiteBackground,
      ]}>
      <ScrollView>
        <View style={styles.imageContainer}>
          <Image
            source={require('../../../assets/images/admin.png')}
            style={styles.image}
          />
        </View>

        <View style={styles.container}>
          <View style={styles.manageContainer}>
            <Text style={styles.heading}>Manage</Text>

            <DropShadow style={styles.containerShadow}>
              <View
                style={styles.manageContentContainer}>
                <TouchableOpacity style={styles.capsuleContainer} onPress={() => navigation.navigate(Routes.ManageStudent)}>
                  <Image
                    source={require('../../../assets/images/group.png')}
                    style={styles.capsuleImage}
                  />

                  <Text style={styles.capsuleContainerText}>Students</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.capsuleContainer, {marginLeft: horizontalScale(20)}]} onPress={() => navigation.navigate(Routes.AllCandidates)}>
                  <Image
                    source={require('../../../assets/images/candidates.png')}
                    style={styles.capsuleImage}
                  />

                  <Text style={styles.capsuleContainerText}>Candidates</Text>
                </TouchableOpacity>
              </View>
            </DropShadow>
          </View>

          <View
            style={[styles.manageContainer, {marginTop: verticalScale(18)}]}>
            <Text style={styles.heading}>Election</Text>

            <DropShadow style={styles.containerShadow}>
              <View style={styles.manageContentContainer}>
                <TouchableOpacity style={styles.capsuleContainer} onPress={() => navigation.navigate(Routes.ManagePosition)}>
                  <Image
                    source={require('../../../assets/images/profile.png')}
                    style={styles.capsuleImage}
                  />

                  <Text style={styles.capsuleContainerText}>Positions</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.capsuleContainer,
                    {marginLeft: horizontalScale(20)},
                  ]}>
                  <Image
                    source={require('../../../assets/images/results.png')}
                    style={styles.capsuleImage}
                  />

                  <Text style={styles.capsuleContainerText}>Result</Text>
                </TouchableOpacity>
              </View>
            </DropShadow>
          </View>

          <DropShadow style={styles.containerShadow}>
            <TouchableOpacity
              style={styles.candidateApplicationContainer}
              onPress={() =>
                navigation.navigate(Routes.AllPendingCandidateApplications)
              }>
              <Image
                source={require('../../../assets/images/approved.png')}
                style={styles.applicationImage}
              />

              <Text style={styles.candidateApplicationText}>
                Candidate Applications
              </Text>
            </TouchableOpacity>
          </DropShadow>
        </View>
      </ScrollView>

      <FooterMenu />
    </SafeAreaView>
  );
};

export default AdminDashboard;
