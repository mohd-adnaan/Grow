import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNRestart from 'react-native-restart';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/Ionicons';
import { Text, View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const UserScreen = () => {
  
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [age,setAge] = useState('');
  const [gender,setGender] = useState('');
  const [designation, setDesignation] = useState('');
  const [address, setAddress] = useState('');
  const [district,setDistrict] = useState('');
  const [state, setState] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      display();
    });
    return unsubscribe;
  }, [navigation]);

  const display = async () => {
    try {
      const name = await AsyncStorage.getItem('name');
      const phone = await AsyncStorage.getItem('phone');
      const age = await AsyncStorage.getItem('age');
      const gender = await AsyncStorage.getItem('gender');
      const designation = await AsyncStorage.getItem('designation');
      const district = await AsyncStorage.getItem('district');
      const address = await AsyncStorage.getItem('address');
      const state = await AsyncStorage.getItem('state');
      
      setAddress(`${address}, ${district},${state}`);
      setPhone(phone);
      setDesignation(designation);
      setAge(age);
      setGender(gender);
      setName(name);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    Alert.alert('Hold on!', 'Are you sure you want to logout?', [
      {
        text: 'No',
        onPress: () => null,
        style: 'cancel',
      },
      {
        text: 'YES',
        onPress: () => {
          AsyncStorage.clear();
          RNRestart.Restart();
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeIconContainer}>
        <Icon name="arrow-back" color="gray" size={30} />
      </TouchableOpacity>
      <View style={styles.profileContainer}>
        <View style={styles.avatarContainer}>
          <MaterialIcons name="account-circle" size={100} color="#9AC5F4" />
        </View>
        <Text style={styles.name}>{name}</Text>
      </View>

      <View style={styles.infoContainer}>
        <InfoItem icon="smartphone" label={`+91 ${phone}`} />
        <InfoItem icon="email" label={designation} />
        <InfoItem icon="business" label={age} />
        <InfoItem icon="person" label={gender} />
        <InfoItem icon="location-city" label={address} />

        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const InfoItem = ({ icon, label }) => {
  return (
    <View style={styles.infoItem}>
      <MaterialIcons name={icon} size={35} color="#9AC5F4" />
      <Text style={styles.infoText}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C3EDC0',
  },
  profileContainer: {
    flex: 1,
    zIndex: 1, 
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#9AC5F4',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 10,
  },
  avatarContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 50,
    padding: 5,
    marginBottom: 20,
  },
  name: {
    color: '#000000',
    fontSize: 20,
    fontWeight: 'bold',
  },
  infoContainer: {
    flex: 2,
    margin: 20,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    elevation: 2,
    padding: 20,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoText: {
    color: '#000000',
    fontSize: 20,
    marginLeft: 20,
  },
  closeIconContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 2, // Set a higher z-index to place it above other views
  },
  logoutButton: {
    backgroundColor: '#C3EDC0',
    width: '80%',
    alignSelf: 'center',
    height: 50,
    borderRadius: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: 20,
  },
  logoutButtonText: {
    color: '#ffffff',
    alignSelf: 'center',
    fontSize: 20,
  },
});

export default UserScreen;