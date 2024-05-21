import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

// tab screens
import ViewAllStudents from '../screens/Admin/ManageStudents/ViewAllStudents/ViewAllStudents';
import AddStudent from '../screens/Admin/ManageStudents/AddStudent/AddStudent';

// tab title component
import CreatePostTabTitle from '../components/CreatePostTabTitle/CreatePostTabTitle';

import {COLORS} from '../constants/theme';

import {horizontalScale} from '../assets/styles/scaling';

const CreatePostTab = createMaterialTopTabNavigator();

const ManageStudentTabNavigation = () => {
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
        name="All Students"
        component={ViewAllStudents}
        options={{
          tabBarLabel: ({focused}) => (
            <CreatePostTabTitle title={'All Students'} isFocused={focused} />
          ),
        }}
      />
      <CreatePostTab.Screen
        name="Add Student"
        component={AddStudent}
        options={{
          tabBarLabel: ({focused}) => (
            <CreatePostTabTitle title={'Add Student'} isFocused={focused} />
          ),
        }}
      />
    </CreatePostTab.Navigator>
  );
};

export default ManageStudentTabNavigation;
