import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, TextInput, ActivityIndicator, Image ,TouchableOpacity} from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import DeviceInfo from 'react-native-device-info';
import NetInfo from "@react-native-community/netinfo";
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';
import { Platform } from 'react-native';
import Logo from '../../../assets/Images/plantlogo.png';
import LogoName from '../../../assets/Images/logoName.png';
import firestore from '@react-native-firebase/firestore';
import database from '@react-native-firebase/database';
import Icon from 'react-native-vector-icons/Ionicons';
const SignUpScreen = ({navigation}) => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [gender, setGender] = useState('');
  const [age,setAge] = useState('');
  const [designation, setDesignation] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pin, setPinCode] = useState('');
  //const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false)
  const [isRegisterSuccess, setIsRegisterSuccess] = useState(false)
  //let url = global.server_url + "register.php";
  const [IsOffline, setIsOffline] = useState(false)
  const [isAnimationVisible, setIsAnimationVisible] = useState(false);
  const [showOtpModule, setShowOtpModule] = useState(false); 
  const [otp, setOtp] = useState('');
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const nameRegex = /^[A-Za-z\s]{3,25}$/;
  const phoneNumberRegex = /^[0-9]{10}$/;
  const designationRegex = /^[\w\s,/&-]{3,50}$/;
  const departmentRegex = /^[\w\s,/&-]{3,100}$/;
  const addressRegex = /^[\w\s,/&-]*$/;
  const stateRegex = /^[\w\s,/&-]{3,50}$/;
  const pinRegex = /^[0-9]{6}$/;

  useEffect(() => {
    const removeNetInfoSubscription = NetInfo.addEventListener((state) => {
      const offline = !(state.isConnected && state.isInternetReachable);
      console.log("offline:", offline)
      setIsOffline(offline);
    });
    return () => removeNetInfoSubscription();
  }, []);

  let brand = DeviceInfo.getBrand();
  let model = brand + " " + DeviceInfo.getModel()
  let os = Platform.OS
  let systemVersion = os + " " + DeviceInfo.getSystemVersion();
  console.log("model", systemVersion)

  const register = async () => {
    try {
      await firestore().collection('UsersData').doc('lEViGUs0JobkDUdEwS5E').set({
        name: name,
        phoneNumber: phoneNumber,
        designation: designation,
        gender: gender,
        age: age,
        address: address,
        state: state,
        pinCode: pin,
        mob_model: model,
        os_version: os,
      });
  
     // setIsRegisterSuccess(true);
    } catch (err) {
      console.log(err);
    }
  };

  const onVerifyOtp = () => {
    if (otp === '123456') {
      setIsOtpVerified(true);
      navigation.navigate('RegisterSuccess')
    } else {
      Alert.alert('Invalid OTP', 'Please enter a valid OTP.');
     
    }
  };
  const onSignInPress = () => {
    navigation.navigate('SignIn');
  };

  const onTermsOfUsePressed = () => {
    navigation.navigate('Terms_Privacy');
  };

  const onPrivacyPressed = () => {
    navigation.navigate('Terms_Privacy');
  };

  const validateName = () => {
    const nameRegex = /^[A-Za-z0-9\s]{3,25}$/;
    return nameRegex.test(name);
  };

  const validatePhoneNumber = () => {
    // const phoneRegex = /^[0-9]{10}$/;
    const phoneRegex = /^[0-9]{0,10}$/;
    return phoneRegex.test(phoneNumber);
  };

  const validateDesignation = () => {
    const designationRegex = /^[\w\s,/&-]{3,50}$/;
    return designationRegex.test(designation);
  };



  const validateAddress = () => {
    return address.trim().length > 0;
  };

  const validatePin = () => {
    const pinRegex = /^[0-9]{6}$/;
    return pinRegex.test(pin);
  };
  const validateOTP = () => {
    const pinRegex = /^[0-9]{6}$/;
    return pinRegex.test(pin);
  };

  const validateState = () => {
    const stateRegex = /^[\w\s,/&-]{3,50}$/;
    return stateRegex.test(state) && state.length > 0;
  };

  const onRegisterPressed = () => {
    if (!validateName()) {
      Alert.alert('Invalid Name', 'Name should contain only alphabets with a length between 3 and 25.');
      return;
    }
    if (!showOtpModule) {
      if (!validatePhoneNumber()) {
        Alert.alert('Invalid Phone Number', 'Phone Number should contain only 10 digits.');
        return;
      }

      // Show OTP module when Phone Number is valid
      
      register();
      //setShowOtpModule(true);
      navigation.navigate('VerifyOTP')
      return;
    }

    // Process OTP verification when OTP module is visible
    if (!validateOTP()) {
      Alert.alert('Invalid OTP', 'OTP should contain only 6 digits.');
      return;
    }
    if (!validateDesignation()) {
      Alert.alert('Invalid Designation', 'Designation should contain only alphabets with a length between 3 and 50.');
      return;
    }

   

    if (!validateAddress()) {
      Alert.alert('Invalid Address', 'Address should not be empty.');
      return;
    }

    if (!validatePin()) {
      Alert.alert('Invalid PinCode', 'PinCode should contain only 6 digits.');
      return;
    }

    if (!validateState()) {
      Alert.alert('Invalid State', 'State should not be empty.');
      return;
    }

    if (!IsOffline) {
      setIsLoading(true)
      register();
      setShowOtpModule(true);
      // console.warn('Registration Successful');
      //navigation.navigate('Parent');
      //navigation.navigate('SignIn');
     // navigation.navigate('RegisterSuccess')

    }
    else {
      Alert.alert("No internet connection")
    }
  };

  return (

    <Animatable.View animation="fadeInUp" style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeIconContainer}>
        <Icon name="arrow-back" color="gray" size={50} />
      </TouchableOpacity>
      <Image source={LogoName} style={styles.logo} />
      <LinearGradient colors={['#E4EAF7', '#ffffff']} style={styles.linearGradient}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <Text style={styles.title}>Register</Text>

            <CustomInput
              name="name"
              value={name}
              setValue={setName}
              placeholder="Name"
              secureTextEntry={false}
              regexPattern={nameRegex}

              onBlur={() => {
                if (!/^[A-Za-z\s]{3,25}$/.test(name)) {
                  Alert.alert('Invalid Name', 'Name should contain only alphabets with a length between 3 and 25.');
                }
              }}
            />
            <TextInput
              name="phoneNumber"
              value={phoneNumber}
              regexPattern={phoneNumberRegex}
              onChangeText={(text) => {
                setPhoneNumber(text);
              }}
              placeholder="Phone Number"
              style={{ ...styles.input, backgroundColor: 'white' }}
              keyboardType="numeric"
              maxLength={10}
              onBlur={() => {
                if (!validatePhoneNumber()) {
                  Alert.alert('Invalid Phone Number', 'Phone Number should contain only 10 digits.');
                }
              }}
            />
               <CustomInput
              name="gender"
              value={gender}
              setValue={setGender}
              placeholder="Gender"
              secureTextEntry={false}
              regexPattern={nameRegex}

              onBlur={() => {
                if (!/^[A-Za-z\s]{3,25}$/.test(name)) {
                  Alert.alert('Invalid Name', 'Gender should contain only alphabets with a length between 3 and 25.');
                }
              }}
            />
              <TextInput
              name="age"
              value={age}
              onChangeText={(text) => {
                setAge(text);
              }}
              placeholder="Age"
              keyboardType="numeric"
              style={{ ...styles.input, backgroundColor: 'white' }}
              maxLength={3}
              regexPattern={pinRegex}
              // onBlur={() => {
              //   if (!validatePin()) {
              //     Alert.alert('Invalid Pin', 'Pin should contain only  digits.');
              //   }
              // }}
            />

            <CustomInput
              name="designation"
              value={designation}
              setValue={setDesignation}
              regexPattern={designationRegex}
              placeholder="Designation"
              onBlur={() => {
                if (!validateDesignation()) {
                  Alert.alert('Invalid Designation', 'Designation should contain only alphabets with a length between 3 and 50.');
                }
              }}
            />

            <CustomInput
              name="address"
              value={address}
              setValue={setAddress}
              regexPattern={addressRegex}
              placeholder="Address"
              onBlur={() => {
                if (!validateAddress()) {
                  Alert.alert('Invalid Address', 'Address should not be empty.');
                }
              }}
            />
                <CustomInput
              name="city"
              value={city}
              setValue={setCity}
              regexPattern={stateRegex}
              placeholder="City"
              // onBlur={() => {
              //   if (!validateState()) {
              //     Alert.alert('Invalid State', 'City should not be empty.');
              //   }
              // }}
            />
            <CustomInput
              name="state"
              value={state}
              setValue={setState}
              regexPattern={stateRegex}
              placeholder="State"
              onBlur={() => {
                if (!validateState()) {
                  Alert.alert('Invalid State', 'State should not be empty.');
                }
              }}
            />
            <TextInput
              name="pin"
              value={pin}
              onChangeText={(text) => {
                setPinCode(text);
              }}
              placeholder="PinCode"
              keyboardType="numeric"
              style={{ ...styles.input, backgroundColor: 'white' }}
              maxLength={6}
              regexPattern={pinRegex}
              onBlur={() => {
                if (!validatePin()) {
                  Alert.alert('Invalid Pin', 'Pin should contain only 6 digits.');
                }
              }}
            />
            <CustomButton text="Register" onPress={onRegisterPressed} />

            <Text style={styles.text}>
              By registering, you confirm that you accept our{' '}
              <Text style={styles.link} onPress={onTermsOfUsePressed}>
                Terms of Use
              </Text>{' '}
              and{' '}
              <Text style={styles.link} onPress={onPrivacyPressed}>
                Privacy Policy
              </Text>
            </Text>

            <CustomButton
              text="Have an account? Sign in"
              onPress={onSignInPress}
              type="TERTIARY"
            />
          </View>
        </ScrollView>
        {showOtpModule && (
          <View style={styles.overlay}>
            <View style={styles.otpBox}>
              <Text style={styles.otpTitle}>Enter OTP</Text>
              <TextInput
                name="otp"
                value={otp}
                onChangeText={setOtp}
                placeholder="Enter OTP"
                keyboardType="numeric"
                style={styles.input}
                maxLength={6}
              />
              <CustomButton text="Verify OTP" onPress={onVerifyOtp} />
            </View>
          </View>
        )}
      </LinearGradient>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#E4EAF7',
  },
  container2: {
    flex: 1,
    height: '100%',
    backgroundColor: '#9AC5F4'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#051C60',
    marginVertical: 10,
  },
  text: {
    color: 'gray',
    marginVertical: 10,
  },
  link: {
    color: '#FDB075',
  },
  input: {
    //marginBottom: 15,
    backgroundColor: '#E1EDF9',
    paddingHorizontal: 10,
    // paddingVertical: 10,
    width: '100%',
    fontSize: 14,
    color: '#444',
    borderColor: '#e8e8e8',
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 5,

  },
  linearGradient: {
    flex: 1,
  },
  logo: {
    width: 200,
    height: 50,
    alignSelf: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  otpBox: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  otpTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  backButtonText: {
    fontSize: 16,
    color: 'black',
  },
  closeIconContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 2, 
  },
});

export default SignUpScreen;


