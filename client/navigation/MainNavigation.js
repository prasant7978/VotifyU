import { createStackNavigator } from "@react-navigation/stack";
import { Routes } from "./Routes";

import Student_Login from "../screens/Login/Student/Student_Login";
import Admin_Login from "../screens/Login/Admin/Admin_Login";
import Home from "../screens/Home/Home";
import Elections from "../screens/Elections/Elections";
import Results from "../screens/Results/Results";
import Profile from "../screens/Profile/Profile";
 
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
        <Stack.Navigator initialRouteName={Routes.Home}>
            <Stack.Screen 
                name={Routes.Home} 
                component={Home}
                options={{
                    title: 'VotifyU'
                }}
            />
            <Stack.Screen 
                name={Routes.Elections} 
                component={Elections}
                options={{
                    title: 'Ongoing Elections',
                    headerLeft: () => false
                }}
            />
            <Stack.Screen 
                name={Routes.Results} 
                component={Results}
                options={{
                    title: 'Results',
                    headerLeft: () => false
                }}
            />
            <Stack.Screen 
                name={Routes.Profile} 
                component={Profile}
                options={{
                    title: 'Profile',
                    headerLeft: () => false
                }}
            />
        </Stack.Navigator>
    );
}

export { AuthenticatedNavigator, NonAuthenticatedNavigator };