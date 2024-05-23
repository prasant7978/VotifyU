import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

// tab screens

// tab title component
import CreatePostTabTitle from '../components/CreatePostTabTitle/CreatePostTabTitle';

import {COLORS} from '../constants/theme';

import {horizontalScale} from '../assets/styles/scaling';
import Elections from '../screens/Elections/Elections';
import Results from '../screens/Results/Results';

const PublishResultsTab = createMaterialTopTabNavigator();

const PublishResultsTabNavigation = () => {
  return (
    <PublishResultsTab.Navigator
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
      <PublishResultsTab.Screen
        name="Ongoing Elections"
        component={Elections}
        options={{
          tabBarLabel: ({focused}) => (
            <CreatePostTabTitle title={'Live Elections'} isFocused={focused} />
          ),
        }}
      />
      <PublishResultsTab.Screen
        name="Election Results"
        component={Results}
        options={{
          tabBarLabel: ({focused}) => (
            <CreatePostTabTitle title={'Election Results'} isFocused={focused} />
          ),
        }}
      />
    </PublishResultsTab.Navigator>
  );
};

export default PublishResultsTabNavigation;
