import React from 'react';
import SignInScreen from '../SignInScreen/SignInScreen';
import { useNavigation } from '@react-navigation/native';
import RNRestart from "react-native-restart";
const SignOutScreen = () => {
  const navigation = useNavigation();
  return (
    RNRestart.Restart()
  );
};

export default SignOutScreen;