import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import RootNavigation from './navigation/RootNavigation';

import { AuthProvider } from './context/aurhContext';

const App = () => {
  return (
    <NavigationContainer>
      <AuthProvider>
        <RootNavigation/>
      </AuthProvider>
    </NavigationContainer>
  );
}

export default App;
