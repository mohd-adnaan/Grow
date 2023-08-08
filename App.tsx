import React,{useEffect, useState} from 'react';
import { SafeAreaView, StyleSheet, Text ,Alert} from 'react-native';
import Navigation from './src/navigation';
import messaging from '@react-native-firebase/messaging';

const App = () => {
useEffect(() => {
    
    getDeviceToken();
}, []);

const getDeviceToken = async () => {
    let token =await messaging().getToken();
    console.log(token);
    console.log("IT is What it is ");
}
useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert(
        'A new FCM message is arrived in Foreground Mode!', 
        JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

return (
<SafeAreaView style={styles.root}>
<Navigation />
</SafeAreaView>
);
};

const styles = StyleSheet.create({
root: {
flex: 1,
backgroundColor: '#F9FBFC',
},
});

export default App;
