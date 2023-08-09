import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';

const RegistrationSuccessAnimation = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Parent');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <Animatable.View
      animation="bounceIn"
      style={styles.container}
    >
      <Ionicons
        style={styles.icon}
        name='checkmark-circle-outline'
        type='evilicon'
        color='#C3EDC0' // Plant-inspired light green color
        size={100}
      />
      <Text style={styles.text}>Registration Successful</Text>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4285F4', // Blue color, similar to the Google logo color
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    alignSelf: 'center',
    marginBottom: 20,
  },
  text: {
    color: '#C3EDC0', // Plant-inspired light green color
    fontSize: 22,
    fontWeight: 'bold',
  },
});

export default RegistrationSuccessAnimation;
