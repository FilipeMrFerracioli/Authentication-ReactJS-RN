import 'react-native-gesture-handler'; // primeiro
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { AuthProvider } from './src/contexts/authContext';
import Routes from './src/routes';

export default function App() {

  return (
    <NavigationContainer>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </NavigationContainer>
  );
}