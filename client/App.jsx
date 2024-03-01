import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigation from './navigation/MainNavigation';
import { AuthProvider } from './context/aurhContext';

const App = () => {
  return (
    <NavigationContainer>
      <AuthProvider>
        <MainNavigation/>
      </AuthProvider>
    </NavigationContainer>
  );
}

export default App;
