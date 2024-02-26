import { createStackNavigator } from "@react-navigation/stack";
import { Routes } from "./Routes";

import Login from "../screens/Login/Login";
import Home from "../screens/Home/Home";
 
const Stack = createStackNavigator();

const MainNavigation = () => {
    return (
        <Stack.Navigator initialRouteName={Routes.Login} screenOptions={{header: () => null, headerShown: false}}>
            <Stack.Screen name={Routes.Login} component={Login}/>
            <Stack.Screen name={Routes.Home} component={Home}/>
        </Stack.Navigator>
    )
}

export default MainNavigation;