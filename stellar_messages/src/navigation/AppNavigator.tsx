import React, {useContext} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../features/auth/screens/LoginScreen';
import RegisterScreen from '../features/auth/screens/RegisterScreen';
import MessageBoardScreen from '../features/messageBoard/screens/MessageBoardScreen';
import {AuthContext} from '../state/AuthContext';

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  MessageBoard: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  const {isLoggedIn, isLoading} = useContext(AuthContext);

  if (isLoading) {
    // Optionally, return a loading indicator
    return null;
  }

  return (
    <Stack.Navigator
      screenOptions={{
        animation: 'fade', // Add fade animation
        headerShown: false,
      }}>
      {isLoggedIn ? (
        <Stack.Screen name="MessageBoard" component={MessageBoardScreen} />
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;
