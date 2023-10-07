import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Image, Alert } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';
import Permissions from 'react-native-permissions';
import { PermissionsAndroid } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const API_KEY = '41a58879ed6634523c5164918cf248eb';
const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=Aligarh&units=metric&appid=${API_KEY}`;
import defaultBG from '../../../assets/Images/cloudy.png'

const WeatherScreen = () => {
  const [weatherData, setWeatherData] = useState(null);
  const navigation = useNavigation();
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [plantName, setPlantName] = useState('');

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
      setSelectedImage(image.path);
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
      setSelectedImage(image.path);
    } catch (error) {
      console.log('ImagePicker Error: ', error);
    }
  };
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
    setSelectedImage(null);
  };

  const getBackgroundImage = () => {
    if (!weatherData) return defaultBG;
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
        {/* <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" color="black" size={30} />
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity> */}
        {weatherData && (
          <TouchableOpacity style={styles.weatherInfoContainer}>
            <Image
              style={styles.weatherIcon}
              source={{ uri: `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png` }}
            />
            <Text style={styles.temperature}>{weatherData.main.temp}°C</Text>
            <Text style={styles.description}>{weatherData.weather[0].description}</Text>
            <Text style={styles.description}>Humidity: {weatherData.main.humidity}%</Text>
            <Text style={styles.description}>Wind Speed: {weatherData.wind.speed} m/s</Text>
            <Text style={styles.description}>Sunrise: {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()}</Text>
            <Text style={styles.description}>Sunset: {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}</Text>
          </TouchableOpacity>
        )}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  plantName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  weatherInfoContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 30,
    padding: 25,
    position: 'absolute',  
    top: 60,  
    left: 0,  
    right: 0,  
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
    color:'black',
  },
  description: {
    fontSize: 20,
    marginTop: 5,
    textAlign: 'center',
    color:'black',
  },
  photoButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    paddingHorizontal: 20,
    marginBottom: 20, 
  },
  photoButton: {
    backgroundColor: '#C3EDC0',
    borderRadius: 20,
    padding: 10,
    alignSelf: 'flex-end',
  },
  photoButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color:'black',
  },
  closeIconContainer3: {
    position: 'absolute',
    top: 2,
    right: 2,
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
  selectedImage: {
    width: 200,
    height: 200,
    marginVertical: 20,
  },

  identifyButton: {
    backgroundColor: '#C3EDC0',
    borderRadius: 20,
    padding: 10,
    alignSelf: 'center',
    marginTop: 20,
  },

  identifyButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color:'black',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalImage: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
  closeModalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  closeModalButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'gray',
    borderRadius: 10,
    padding: 10,
  },
  closeModalButtonText: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 5, 
  },
  lineBreak:{
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    marginVertical: 2,
  }
});

export default WeatherScreen;

