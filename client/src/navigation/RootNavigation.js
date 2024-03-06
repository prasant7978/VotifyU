import React, { useContext } from "react";
import { AuthContext } from "../context/aurhContext";
import { AuthenticatedNavigator, NonAuthenticatedNavigator } from "./MainNavigation";

const RootNavigation = () => {
    const [userState] = useContext(AuthContext);
    const isLoggedIn = userState?.user && userState?.token;

    return isLoggedIn ? <AuthenticatedNavigator/> : <NonAuthenticatedNavigator/>
}

export default RootNavigation;