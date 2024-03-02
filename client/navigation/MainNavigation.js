import { createStackNavigator } from "@react-navigation/stack";
import { Routes } from "./Routes";

import Student_Login from "../screens/Login/Student/Student_Login";
import Admin_Login from "../screens/Login/Admin/Admin_Login";
import Home from "../screens/Home/Home";
 
const Stack = createStackNavigator();

const NonAuthenticatedNavigator = () => {
    return (
        <Stack.Navigator initialRouteName={Routes.Student_Login} screenOptions={{header: () => null, headerShown: false}}>
            <Stack.Screen name={Routes.Student_Login} component={Student_Login}/>
            <Stack.Screen name={Routes.Admin_Login} component={Admin_Login}/>
            <Stack.Screen name={'AuthenticatedNavigator'} component={AuthenticatedNavigator}/>
        </Stack.Navigator>
    );
}

const AuthenticatedNavigator = () => {
    return (
        <Stack.Navigator initialRouteName={Routes.Home} screenOptions={{header: () => null, headerShown: false}}>
            <Stack.Screen name={Routes.Home} component={Home}/>
        </Stack.Navigator>
    );
}

export { AuthenticatedNavigator, NonAuthenticatedNavigator };