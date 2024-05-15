import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

// tab screens
import CreateCampaign from '../screens/CreatePost/CreateCampaign/CreateCampaign';
import CreateNotice from '../screens/CreatePost/CreateNotice/CreateNotice';

// tab title component
import CreatePostTabTitle from '../components/CreatePostTabTitle/CreatePostTabTitle';

import {COLORS} from '../constants/theme';

import {horizontalScale} from '../assets/styles/scaling';

const CreatePostTab = createMaterialTopTabNavigator();

const CreatePostTabNavigation = () => {
  return (
    <CreatePostTab.Navigator
      screenOptions={{
        tabBarIndicatorStyle: {
          backgroundColor: COLORS.lightSkyLine,
        },
        tabBarStyle: {
          zIndex: 0,
          elevation: 0,
          backgroundColor: COLORS.antifleshWhite,
          borderRadius: horizontalScale(7),
        },
      }}>
      <CreatePostTab.Screen
        name="Create Campaign"
        component={CreateCampaign}
        options={{
          tabBarLabel: ({focused}) => (
            <CreatePostTabTitle title={'Create Campaign'} isFocused={focused} />
          ),
        }}
      />
      <CreatePostTab.Screen
        name="Create Notice"
        component={CreateNotice}
        options={{
          tabBarLabel: ({focused}) => (
            <CreatePostTabTitle title={'Create Notice'} isFocused={focused} />
          ),
        }}
      />
    </CreatePostTab.Navigator>
  );
};

export default CreatePostTabNavigation;
