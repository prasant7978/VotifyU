import {TouchableOpacity} from 'react-native';

import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

import {Routes} from './Routes';

// importing screens
import Student_Login from '../screens/Login/Student/Student_Login';
import Admin_Login from '../screens/Login/Admin/Admin_Login';
import Feeds from '../screens/Feeds/Feeds';
import Elections from '../screens/Elections/Elections';
import Results from '../screens/Results/Results';
import StudentProfile from '../screens/Profile/StudentProfile/StudentProfile';
import CandidateProfile from '../screens/Profile/CandidateProfile/CandidateProfile';
import AboutElection from '../screens/AboutElection/AboutElection';
import Feedback from '../screens/Feedback/Feedback';
import HelpCenter from '../screens/Help Center/HelpCenter';
import UpdatePassword from '../screens/UpdatePassword/UpdatePassword';
import UpdateCampaign from './../screens/UpdateCampaign/UpdateCampaign';
import CandidateApply from '../screens/CandidateApply/CandidateApply';
import SingleCandidateApplication from '../screens/SingleCandidateApplication/SingleCandidateApplication';
import AllPendingCandidateApplications from '../screens/AllCandidateApplication/AllPendingCandidateApplications';
import CreatePost from '../screens/CreatePost/CreatePost';

// icons
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faBars,
  faCircleInfo,
  faHome,
  faPenToSquare,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';
import {faComments, faSquarePlus} from '@fortawesome/free-regular-svg-icons';
import {faHeadset} from '@fortawesome/free-solid-svg-icons/faHeadset';

import {DrawerActions, useNavigation} from '@react-navigation/native';

import DrawerContent from '../components/Drawer/DrawerContent';

// assets
import {getFontFamily} from '../assets/fonts/helper';
import {horizontalScale, scaleFontSize} from '../assets/styles/scaling';

import {COLORS} from '../constants/theme';
import AdminDashboard from '../screens/AdminDashboard/AdminDashboard';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <DrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: COLORS.primary,
        drawerActiveTintColor: '#FFFFFF',
        drawerInactiveTintColor: '#000000',
        drawerLabelStyle: {
          marginLeft: horizontalScale(-15),
          fontFamily: getFontFamily('Inter', '500'),
          fontSize: scaleFontSize(15),
        },
      }}>
      <Drawer.Screen
        name={'Home'}
        component={StackNavigator}
        options={{
          title: 'Home',
          drawerIcon: () => <FontAwesomeIcon icon={faHome} size={22} />,
        }}
      />
      <Drawer.Screen
        name={Routes.AboutElection}
        component={AboutElection}
        options={{
          title: 'About Election',
          drawerIcon: () => <FontAwesomeIcon icon={faCircleInfo} size={22} />,
          headerShown: true,
        }}
      />
      <Drawer.Screen
        name={Routes.CreatePost}
        component={CreatePost}
        options={{
          title: 'Create Post',
          drawerIcon: () => <FontAwesomeIcon icon={faSquarePlus} size={22} />,
          headerShown: true,
        }}
      />
      <Drawer.Screen
        name={Routes.Feedback}
        component={Feedback}
        options={{
          drawerIcon: () => <FontAwesomeIcon icon={faComments} size={22} />,
        }}
      />
      <Drawer.Screen
        name={Routes.CandidateApply}
        component={CandidateApply}
        options={{
          title: 'Apply For Candidate',
          drawerIcon: () => <FontAwesomeIcon icon={faPenToSquare} size={22} />,
          headerShown: true,
        }}
      />
      <Drawer.Screen
        name={Routes.AllPendingCandidateApplications}
        component={AllPendingCandidateApplications}
        options={{
          title: 'Candidate Applications',
          drawerIcon: () => <FontAwesomeIcon icon={faUsers} size={22} />,
          headerShown: true,
        }}
      />
      <Drawer.Screen
        name={Routes.HelpCenter}
        component={HelpCenter}
        options={{
          title: 'Help Center',
          drawerIcon: () => <FontAwesomeIcon icon={faHeadset} size={22} />,
          headerShown: true,
        }}
      />
    </Drawer.Navigator>

    // <Drawer.Navigator initialRouteName={Routes.AboutElection}>
    // <Drawer.Screen name={Routes.AboutElection} component={AboutElection} options={{title: 'About Election'}}/>
    // <Drawer.Screen name={Routes.CreateCampaign} component={CreateCampaign} options={{title: 'Create Campaign'}}/>
    // <Drawer.Screen name={Routes.Feedback} component={Feedback}/>
    // <Drawer.Screen name={Routes.HelpCenter} component={HelpCenter} options={{title: 'Help Center'}}/>
    // </Drawer.Navigator>
  );
};

const StackNavigator = () => {
  const navigation = useNavigation();

  return (
    <Stack.Navigator
      screenOptions={{
        headerLeft: () => {
          return (
            <TouchableOpacity
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
              <FontAwesomeIcon
                icon={faBars}
                color="#000000"
                size={24}
                style={{marginLeft: 10}}
              />
            </TouchableOpacity>
          );
        },
      }}>
      <Stack.Screen
        name={Routes.Feeds}
        component={Feeds}
        options={{
          title: 'VotifyU',
        }}
      />
      <Stack.Screen
        name={Routes.Elections}
        component={Elections}
        options={{
          title: 'Ongoing Elections',
        }}
      />
      <Stack.Screen
        name={Routes.Results}
        component={Results}
        options={{
          title: 'Results',
        }}
      />
      <Stack.Screen
        name={Routes.StudentProfile}
        component={StudentProfile}
        options={{
          title: 'Profile',
        }}
      />
      <Stack.Screen
        name={Routes.CandidateProfile}
        component={CandidateProfile}
        options={{
          title: 'Profile',
        }}
      />
      <Stack.Screen
        name={Routes.UpdatePassword}
        component={UpdatePassword}
        options={{
          title: 'Update Password',
        }}
      />
      <Stack.Screen
        name={Routes.UpdateCampaign}
        component={UpdateCampaign}
        options={{
          title: 'Update Campaign',
        }}
      />
      <Stack.Screen
        name={Routes.SingleCandidateApplication}
        component={SingleCandidateApplication}
        options={{
          title: 'Application',
        }}
      />
      <Stack.Screen
        name={Routes.AdminDashboard}
        component={AdminDashboard}
        options={{
          title: 'Dashboard',
        }}
      />
      <Stack.Screen
        name={'DrawerNavigator'}
        component={DrawerNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={'NonAuthenticatedNavigator'}
        component={NonAuthenticatedNavigator}
      />
    </Stack.Navigator>
  );
};

const NonAuthenticatedNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={Routes.Student_Login}
      screenOptions={{header: () => null, headerShown: false}}>
      <Stack.Screen name={Routes.Student_Login} component={Student_Login} />
      <Stack.Screen name={Routes.Admin_Login} component={Admin_Login} />
      {/* <Stack.Screen name={'AuthenticatedNavigator'} component={AuthenticatedNavigator}/> */}
      <Stack.Screen name={'StackNavigator'} component={StackNavigator} />
    </Stack.Navigator>
  );
};

const AuthenticatedNavigator = () => {
  return (
    <DrawerNavigator />
    // <Stack.Navigator initialRouteName="Drawer" screenOptions={{ header: () => null, headerShown: false }}>
    //     <Stack.Screen name="Drawer" component={DrawerNavigator} />
    //     <Stack.Screen name="Stack" component={StackNavigator} />
    // </Stack.Navigator>
  );
};

export {AuthenticatedNavigator, NonAuthenticatedNavigator};
