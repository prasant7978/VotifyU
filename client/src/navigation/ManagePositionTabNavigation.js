import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

// tab screens
import AboutElection from '../screens/AboutElection/AboutElection';
import AddPosition from '../screens/Admin/ManagePosition/AddPosition/AddPosition';

// tab title component
import CreatePostTabTitle from '../components/CreatePostTabTitle/CreatePostTabTitle';

import { COLORS } from '../constants/theme';

import { horizontalScale } from '../assets/styles/scaling';

const ManagePositionTab = createMaterialTopTabNavigator();

const ManagePositionTabNavigation = () => {
  return (
    <ManagePositionTab.Navigator
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
      <ManagePositionTab.Screen
        name="All Positions"
        component={AboutElection}
        options={{
          tabBarLabel: ({focused}) => (
            <CreatePostTabTitle title={'All Positions'} isFocused={focused} />
          ),
        }}
      />
      <ManagePositionTab.Screen
        name="Add Position"
        component={AddPosition}
        options={{
          tabBarLabel: ({focused}) => (
            <CreatePostTabTitle title={'Add Position'} isFocused={focused} />
          ),
        }}
      />
    </ManagePositionTab.Navigator>
  );
};

export default ManagePositionTabNavigation;
