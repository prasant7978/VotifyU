import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import RootNavigation from './navigation/RootNavigation';

import { AuthProvider } from './context/authContext';
import { PostProvider } from './context/postContext';

const App = () => {
  return (
    <NavigationContainer>
      <AuthProvider>
        <PostProvider>
          <RootNavigation/>
        </PostProvider>
      </AuthProvider>
    </NavigationContainer>
  );
}

export default App;
