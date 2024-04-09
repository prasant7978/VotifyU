import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/authContext";
import { AuthenticatedNavigator, NonAuthenticatedNavigator } from "./MainNavigation";

const RootNavigation = () => {
    const [userState] = useContext(AuthContext);
    const isLoggedIn = userState?.token;

    // console.log('is logged in: ', isLoggedIn);

    return isLoggedIn ? <AuthenticatedNavigator/> : <NonAuthenticatedNavigator/>
}

export default RootNavigation;