import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import LogoName from '../../../assets/Images/logoName.png';
import Logo from '../../../assets/Images/plantlogo.png';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../components/context';
import RNRestart from 'react-native-restart';
import LinearGradient from 'react-native-linear-gradient';
import { ActivityIndicator } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
const SignInScreen = () => {
  // let url = "http://192.168.1.54/integrate/login.php"
  const [phoneNumber, setPhoneNumber] = useState('');
  const [username, setUsername] = useState('');
  const [confirmData, setConfirmData] = useState('');
  const { height } = useWindowDimensions();
  const navigation = useNavigation();
  const [IsOffline, setIsOffline] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [confirm, setConfirm] = useState(false);

  useEffect(() => {
    const removeNetInfoSubscription = NetInfo.addEventListener((state) => {
      const offline = !(state.isConnected && state.isInternetReachable);
      console.log("offline:", offline);
      setIsOffline(offline);
    });

    return () => removeNetInfoSubscription();
  }, []);


  const login = async () => {
    try {
      const userDataSnapshot = await firestore()
        .collection('UsersData')
        .where('phoneNumber', '==', phoneNumber)
        .where('name', '==', username)
        .get();

      if (!userDataSnapshot.empty) {
        const userData = userDataSnapshot.docs[0].data();

        // Save user data in AsyncStorage or state
        await AsyncStorage.setItem('IsLoggedIn', JSON.stringify(true));
        await AsyncStorage.setItem('name', userData.name);
        await AsyncStorage.setItem('phoneNumber', userData.phoneNumber);
        await AsyncStorage.setItem('designation', userData.designation);
        await AsyncStorage.setItem('gender', userData.gender);
        await AsyncStorage.setItem('age', userData.age);
        await AsyncStorage.setItem('address', userData.address);
        await AsyncStorage.setItem('state', userData.state);
        await AsyncStorage.setItem('pin', userData.pinCode);

        setPhoneNumber('');
        setIsLoading(false);
        navigation.navigate('Parent');
      } else {
        //alert('User not found');
        setIsLoading(false);
        setPhoneNumber('');
      }
    } catch (error) {
      alert(error.message);
      setIsLoading(false);
    }
  };



  const onSendOTPPressed = async () => {
    if (phoneNumber.length === 10 && !IsOffline) {
      //setIsLoading(true);
      login();
      // const phone = '+91' + phoneNumber;
      // const response = await auth().signInWithPhoneNumber(phone);
      // setConfirmData(response);
      // console.log(response);
      //<TextInput value={code} onChangeText={text => setCode(text)} />
      //Alert.alert('OTP is sent Please Verify it.');
      //confirmCode()
      //signInWithPhoneNumber('+91 853-200-9954')
      navigation.navigate('Parent');


    } else if (IsOffline) {
      alert('Please check your internet connection');
    } else {
      alert('Phone number should be of valid 10 digits');
    }
  };
  const onSignUpPress = () => {
    navigation.navigate('SignUp');
  };

  return (

    <View style={styles.container}>
      <View style={styles.content}>
      <Image source={LogoName} style={styles.logoName} />
        {/* <Image
          source={EmblemLogo}
          style={styles.emblemLogo}
          resizeMode="contain"
        /> */}
        <Image
          source={Logo}
          style={[styles.logo, { height: height * 0.25 }]}
        //resizeMode="contain"
        />

        <TextInput
          name="username"
          placeholder="User Name"
          value={username}
          onChangeText={text =>
            setUsername(text)}
          style={{ ...styles.input, backgroundColor: 'white' }}
        />

        <TextInput
          name="phoneNumber"
          placeholder="Phone Number"
          value={phoneNumber}
          onChangeText={(text) => {
            const numericRegex = /^[0-9]{0,10}$/;
            if (numericRegex.test(text)) {
              setPhoneNumber(text);
            }
          }}
          style={{ ...styles.input, backgroundColor: 'white' }}
          keyboardType="numeric"
          maxLength={10}
        />


        <CustomButton
          text={'Sign In'}
          onPress={onSendOTPPressed}
          style={styles.signInButton}
          textStyle={styles.signInButtonText}
        />

        <CustomButton
          text="Don't have an account? Register"
          onPress={onSignUpPress}
          type="TERTIARY"
          style={styles.signUpButton}
          textStyle={styles.signUpButtonText}
        />
      </View>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#77CC77" />
          <Text style={styles.loadingText}>Please wait...</Text>
        </View>
      ) : null}
      <View style={styles.footer}>
        <Image
          source={require('../../../assets/Images/plantlogo.png')}
          style={styles.footerImage}
          resizeMode="contain"
        />
        <Text style={styles.footerText}>Design and Developed by A&A</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E4EAF7',
    //backgroundColor: '#77CC77',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: '60%',
    maxWidth: 200,
    maxHeight: 200,
    marginBottom: 20,
  },
  logoName: {
    width: 200,
    height: 50,
    alignSelf: 'center',
    padding: 20,
  },
  input: {
    marginBottom: 15,
    backgroundColor: '#E1EDF9',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    width: '100%',
    fontSize: 16,
    color: '#444',
  },
  signInButton: {
    marginBottom: 15,
    backgroundColor: '#77CC77',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    width: '100%',
    alignItems: 'center',
  },
  signInButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
  signUpButton: {
    backgroundColor: 'transparent',
    marginBottom: 5,
    fontSize: 16,
  },
  signUpButtonText: {
    fontSize: 14,
    color: '#77CC77',
  },
  emblemLogo: {
    width: 100,
    height: 100,
    marginTop: 20,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#F4F8FD',
    borderTopWidth: 1,
    borderTopColor: '#D3DCE6',
  },
  footerText: {
    fontSize: 14,
    color: '#888',
  },
  footerImage: {
    width: 50,
    height: 50,
    marginBottom: 5,
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    zIndex: 999,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    fontFamily: 'Helvetica',
  },
});

export default SignInScreen;