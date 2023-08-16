import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';
import Permissions from 'react-native-permissions';
import { PermissionsAndroid } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const API_KEY = '41a58879ed6634523c5164918cf248eb';
const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=Aligarh&units=metric&appid=${API_KEY}`;


const HomeScreen = () => {
  const [weatherData, setWeatherData] = useState(null);
  const navigation = useNavigation();
const requestCameraPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Grow ask for Camera Permission',
        message: 'Grow needs access to your Location ',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the Camera');
      getLocation();
    } else {
      console.log('Camera permission denied');
    }
  } catch (err) {
  }
};

useEffect(() => {
  requestCameraPermission();
}, []);

  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(API_URL);
      setWeatherData(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, []);

  const handleTakePhoto = async () => {
    try {
      const options = {
        mediaType: 'photo',
        cropping: true,
        width: 500,
        height: 500,
      };

      const image = await ImagePicker.openCamera(options);

      // Use the taken image (image.path) in your app
    } catch (error) {
      console.log('ImagePicker Error: ', error);
    }
  };

  const handleSelectPhoto = async () => {
    try {
      const options = {
        mediaType: 'photo',
        cropping: true,
        width: 500,
        height: 500,
      };

      const image = await ImagePicker.openPicker(options);

      // Use the selected image (image.path) in your app
    } catch (error) {
      console.log('ImagePicker Error: ', error);
    }
  };

  const getBackgroundImage = () => {
    if (!weatherData) return require('../../../assets/Images/default.png');
    const weatherCode = weatherData.weather[0].id;
    if (weatherCode >= 200 && weatherCode < 600) {
      return require('../../../assets/Images/rain.png');
    } else if (weatherCode >= 600 && weatherCode < 700) {
      return require('../../../assets/Images/snow.png');
    } else if (weatherCode >= 801 && weatherCode <= 804) {
      return require('../../../assets/Images/cloudy.png');
    }
    return require('../../../assets/Images/sunny.png');
  };

  return (
    <View style={styles.container}>
    

      <ImageBackground source={getBackgroundImage()} style={styles.backgroundImage}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="pencil" color="black" size={30} />
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
        {weatherData && (
          <TouchableOpacity style={styles.weatherInfoContainer}>
            <Image
              style={styles.weatherIcon}
              source={{ uri: `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png` }}
            />
            <Text style={styles.temperature}>{weatherData.main.temp}°C</Text>
            <Text style={styles.description}>{weatherData.weather[0].description}</Text>
          </TouchableOpacity>
        )}

        <View style={styles.photoButtonsContainer}>
          <TouchableOpacity style={styles.photoButton} onPress={handleSelectPhoto}>
            <Text style={styles.photoButtonText}>Select Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.photoButton} onPress={handleTakePhoto}>
            <Text style={styles.photoButtonText}>Take Photo</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  weatherInfoContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  weatherIcon: {
    width: 100,
    height: 100,
  },
  temperature: {
    fontSize: 36,
    fontWeight: 'bold',
    marginTop: 10,
  },
  description: {
    fontSize: 20,
    marginTop: 5,
    textAlign: 'center',
  },
  photoButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    paddingHorizontal: 20,
    marginBottom: 20, // Add a margin to separate from the weather info
  },
  photoButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 20,
    padding: 10,
    alignSelf: 'flex-end',
  },
  photoButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 16,
    color: 'black',
  },
});

export default HomeScreen;
