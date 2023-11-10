import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
  Animated,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const VerifyOTPScreen = () => {
  const inputRefs = Array(6).fill(0).map((_, index) => useRef(null));
  const [otp, setOTP] = useState('');
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const scaleValue = useRef(new Animated.Value(0)).current;

  const handleOTPChange = (value, index) => {
    const newOTP = otp.split('');
    newOTP[index] = value;
    setOTP(newOTP.join(''));

    if (index < inputRefs.length - 1 && value) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handleVerify = async () => {
    try {
      Keyboard.dismiss();
      setIsLoading(true);
      // Simulate verification API call with a delay
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsLoading(false);

      navigation.navigate('RegisterSuccess');
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };

  const renderOtpInputs = () => {
    return inputRefs.map((ref, index) => (
      <Animated.View
        key={index}
        style={[styles.otpInputContainer, animatedStyle(index)]}
      >
        <TextInput
          ref={ref}
          style={styles.otpInput}
          onChangeText={(value) => handleOTPChange(value, index)}
          value={otp[index] ? otp[index] : ''}
          keyboardType="numeric"
          maxLength={1}
          onFocus={() => animateInput(index)}
        />
      </Animated.View>
    ));
  };

  const animateInput = (index) => {
    Animated.timing(scaleValue, {
      toValue: index,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const animatedStyle = (index) => {
    return {
      transform: [
        {
          scale: scaleValue.interpolate({
            inputRange: [-1, index, index + 1],
            outputRange: [1, 1.3, 1],
          }),
        },
      ],
    };
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter the verification code</Text>
      <View style={styles.otpContainer}>{renderOtpInputs()}</View>
      <TouchableOpacity
        style={styles.verifyButton}
        onPress={handleVerify}
        disabled={isLoading}
      >
        <Text style={styles.verifyButtonText}>
          {isLoading ? 'Verifying...' : 'Verify'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  otpInputContainer: {
    marginHorizontal: 5,
  },
  otpInput: {
    borderWidth: 2,
    borderColor: '#007AFF',
    borderRadius: 10,
    width: 50,
    height: 60,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#007AFF',
  },
  verifyButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20,
  },
  verifyButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default VerifyOTPScreen;
