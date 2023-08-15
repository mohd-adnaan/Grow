// import React, { useState, useEffect } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import RNRestart from 'react-native-restart';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import Icon from 'react-native-vector-icons/Ionicons';
// import { Text, View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
// import { useNavigation } from '@react-navigation/native';

// const UserScreen = () => {
//   const [name, setName] = useState('');
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [designation, setDesignation] = useState('');
//   const [department, setDepartment] = useState('');
//   const [address, setAddress] = useState('');
//   const navigation = useNavigation();

//   useEffect(() => {
//     const unsubscribe = navigation.addListener('focus', () => {
//       display();
//     });
//     return unsubscribe;
//   }, [navigation]);

//   const display = async () => {
//     try {
//       const name = await AsyncStorage.getItem('name');
//       const phoneNumber = await AsyncStorage.getItem('phoneNumber');
//       const designation = await AsyncStorage.getItem('designation');
//       const department = await AsyncStorage.getItem('department');
//       const address = await AsyncStorage.getItem('address');
//       const state = await AsyncStorage.getItem('state');
//       const pinCode = await AsyncStorage.getItem('pinCode');
//       setAddress(`${address}, ${state}, ${pinCode}`);
//       setPhoneNumber(phoneNumber);
//       setDesignation(designation);
//       setDepartment(department);
//       setName(name);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleLogout = () => {
//     Alert.alert('Hold on!', 'Are you sure you want to logout?', [
//       {
//         text: 'No',
//         onPress: () => null,
//         style: 'cancel',
//       },
//       {
//         text: 'YES',
//         onPress: () => {
//           AsyncStorage.clear();
//           RNRestart.Restart();
//         },
//       },
//     ]);
//   };

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeIconContainer}>
//         <Icon name="ios-arrow-back" color="gray" size={30} />
//       </TouchableOpacity>
//       <View style={styles.profileContainer}>
//         <View style={styles.avatarContainer}>
//           <MaterialIcons name="account-circle" size={100} color="#9AC5F4" />
//         </View>
//         <Text style={styles.name}>{name}</Text>
//       </View>

//       <View style={styles.infoContainer}>
//         <InfoItem icon="smartphone" label={`+91 ${phoneNumber}`} />
//         <InfoItem icon="email" label={designation} />
//         <InfoItem icon="business" label={department} />
//         <InfoItem icon="location-city" label={address} />

//         <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
//           <Text style={styles.logoutButtonText}>Logout</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const InfoItem = ({ icon, label }) => {
//   return (
//     <View style={styles.infoItem}>
//       <MaterialIcons name={icon} size={35} color="#9AC5F4" />
//       <Text style={styles.infoText}>{label}</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F4F7FC',
//   },
//   profileContainer: {
//     flex: 1,
//     zIndex: 1, // Set a higher z-index to place it above other views
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#9AC5F4',
//     borderBottomLeftRadius: 20,
//     borderBottomRightRadius: 20,
//     marginBottom: 10,
//   },
//   avatarContainer: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 50,
//     padding: 5,
//     marginBottom: 20,
//   },
//   name: {
//     color: '#000000',
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   infoContainer: {
//     flex: 2,
//     margin: 20,
//     borderRadius: 20,
//     backgroundColor: '#FFFFFF',
//     elevation: 2,
//     padding: 20,
//   },
//   infoItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   infoText: {
//     color: '#000000',
//     fontSize: 20,
//     marginLeft: 20,
//   },
//   closeIconContainer: {
//     position: 'absolute',
//     top: 10,
//     left: 10,
//     zIndex: 2, 
//   },
//   logoutButton: {
//     backgroundColor: '#1E88E5',
//     width: '80%',
//     alignSelf: 'center',
//     height: 50,
//     borderRadius: 10,
//     flexDirection: 'column',
//     justifyContent: 'center',
//     marginTop: 20,
//   },
//   logoutButtonText: {
//     color: '#ffffff',
//     alignSelf: 'center',
//     fontSize: 20,
//   },
// });

// export default UserScreen;
//----------------------------------------------------------------

import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNRestart from 'react-native-restart';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/Ionicons';
import { Text, View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import { IconButton } from 'react-native-paper';

const UserScreen = () => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [gender, setGender] = useState('');
  const [age,setAge] = useState('');
  const [designation, setDesignation] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pin,setPinCode] = useState('');
  const navigation = useNavigation();

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
  
  useEffect(() => {
    getUsersData();
  }, []);

  const getUsersData = async () => {
    try {
      const data = await firestore()
        .collection('UsersData')
        .doc('lEViGUs0JobkDUdEwS5E')
        .get();
      console.log(data.data());
      const name = data.data().name;
      const phoneNumber = data.data().phoneNumber;
      const designation = data.data().designation;
      const gender = data.data().gender;
      const age = data.data().age;
      const address = data.data().address;
      const state = data.data().state;
      const pin = data.data().pinCode;

      setName(name);
      setPhoneNumber(phoneNumber);
      setDesignation(designation);
      setGender(gender);
      setAge(age);
      setAddress(`${address}, ${state}, ${pin}`);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeIconContainer}>
        <Icon name="arrow-back" color="gray" size={30} />
      </TouchableOpacity>
      <View style={styles.profileContainer}>
        <View style={styles.avatarContainer}>
          <IconButton name="account-circle" size={100} color="#9AC5F4" />
        </View>
        <Text style={styles.name}>{name}</Text>
      </View>

      <View style={styles.infoContainer}>
        <InfoItem icon="smartphone" label={`+91 ${phoneNumber}`} />
        <InfoItem icon="email" label={gender} />
        <InfoItem icon="business" label={designation} />
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
    backgroundColor: '#F4F7FC',
  },
  profileContainer: {
    flex: 1,
    zIndex: 1, // Set a higher z-index to place it above other views
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#C3EDC0',
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
    zIndex: 2, 
  },
  logoutButton: {
    backgroundColor: '#1E88E5',
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

//------------------------------------------------------------------------------


// import React, { useState, useEffect } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import RNRestart from 'react-native-restart';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import { Text, View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import firestore from '@react-native-firebase/firestore';
// import { IconButton } from 'react-native-paper';

// const UserScreen = () => {
//   const [name, setName] = useState('');
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [gender, setGender] = useState('');
//   const [age, setAge] = useState('');
//   const [designation, setDesignation] = useState('');
//   const [address, setAddress] = useState('');
//   const [city, setCity] = useState('');
//   const [state, setState] = useState('');
//   const [pin, setPinCode] = useState('');
//   const navigation = useNavigation();

//   const handleLogout = () => {
//     Alert.alert('Hold on!', 'Are you sure you want to logout?', [
//       {
//         text: 'No',
//         onPress: () => null,
//         style: 'cancel',
//       },
//       {
//         text: 'YES',
//         onPress: () => {
//           AsyncStorage.clear();
//           RNRestart.Restart();
//         },
//       },
//     ]);
//   };

//   useEffect(() => {
//     getUsersData();
//   }, []);

//   const getUsersData = async () => {
//     try {
//       const data = await firestore()
//         .collection('UsersData')
//         .doc('lEViGUs0JobkDUdEwS5E')
//         .get();
//       console.log(data.data());
//       const name = data.data().name;
//       const phoneNumber = data.data().phoneNumber;
//       const designation = data.data().designation;
//       const gender = data.data().gender;
//       const age = data.data().age;
//       const address = data.data().address;
//       const state = data.data().state;
//       const pin = data.data().pinCode;

//       setName(name);
//       setPhoneNumber(phoneNumber);
//       setDesignation(designation);
//       setGender(gender);
//       setAge(age);
//       setAddress(`${address}, ${state}, ${pin}`);
//     } catch (err) {
//       console.log(err);
//     }
//   };
//   return (
//     <View style={styles.container}>
//       <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeIconContainer}>
//         <IconButton icon="arrow-left" color="gray" size={30} />
//       </TouchableOpacity>
//       <View style={styles.profileContainer}>
//         <View style={styles.avatarContainer}>
//           <IconButton icon="account-circle" size={100} color="#9AC5F4" />
//         </View>
//         <Text style={styles.name}>{name}</Text>
//       </View>

//       <View style={styles.infoContainer}>
//         <InfoItem icon="smartphone" label={`+91 ${phoneNumber}`} />
//         <InfoItem icon="email" label={gender} />
//         <InfoItem icon="business" label={designation} />
//         <InfoItem icon="location-city" label={address} />

//         <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
//           <Text style={styles.logoutButtonText}>Logout</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const InfoItem = ({ icon, label }) => {
//   return (
//     <View style={styles.infoItem}>
//       <MaterialIcons name={icon} size={35} color="#9AC5F4" />
//       <Text style={styles.infoText}>{label}</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F4F7FC',
//   },
//   profileContainer: {
//     flex: 1,
//     zIndex: 1, // Set a higher z-index to place it above other views
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#9AC5F4',
//     borderBottomLeftRadius: 20,
//     borderBottomRightRadius: 20,
//     marginBottom: 10,
//   },
//   avatarContainer: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 50,
//     padding: 5,
//     marginBottom: 20,
//   },
//   name: {
//     color: '#000000',
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   infoContainer: {
//     flex: 2,
//     margin: 20,
//     borderRadius: 20,
//     backgroundColor: '#FFFFFF',
//     elevation: 2,
//     padding: 20,
//   },
//   infoItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   infoText: {
//     color: '#000000',
//     fontSize: 20,
//     marginLeft: 20,
//   },
//   closeIconContainer: {
//     position: 'absolute',
//     top: 10,
//     left: 10,
//     zIndex: 2,
//   },
//   logoutButton: {
//     backgroundColor: '#1E88E5',
//     width: '80%',
//     alignSelf: 'center',
//     height: 50,
//     borderRadius: 10,
//     flexDirection: 'column',
//     justifyContent: 'center',
//     marginTop: 20,
//   },
//   logoutButtonText: {
//     color: '#ffffff',
//     alignSelf: 'center',
//     fontSize: 20,
//   },
// });

// export default UserScreen;
