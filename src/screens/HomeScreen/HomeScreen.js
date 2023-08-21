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

const API_DETECT_KEY = 'sk-q5iJ64d21208a28571796';
const API_DETECT_URL = 'https://identify.plantnet.org/k-world-flora/identify';

const HomeScreen = () => {
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

  // const handleIdentifyPlant = () => {
  //     setIsModalVisible(true);
  //     if (selectedImage) {
  //       //Alert.alert('Please select an image first.');
  //       setIsModalVisible(!isModalVisible); 
  //     return;
  //   }
  // };

  const handleIdentifyPlant = async () => {
    setIsModalVisible(true);
    if (selectedImage) {
      setIsModalVisible(!isModalVisible); 
      //Alert.alert('Please select an image first.');
      return;
    }
    try {
      const formData = new FormData();
      formData.append('organs', 'flower');
      formData.append('images', {
        uri: selectedImage,
        type: 'image/jpeg',
        name: 'image.jpg',
      });
    
      const response = await fetch(API_DETECT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          'Api-Key': API_DETECT_KEY,
        },
        body: formData,
      });
    
      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }
    
      const data = await response.json();
      // Process the data...
    } catch (error) {
      console.log('Error:', error.message);
    }
  };    

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
    setSelectedImage(null);
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
          <Icon name="arrow-back" color="black" size={30} />
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

        {selectedImage && (
          <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
        )}
        <Text style={styles.plantName}>{plantName}</Text>

        <TouchableOpacity style={styles.identifyButton} onPress={handleIdentifyPlant}>
          <Text style={styles.identifyButtonText}>Identify Plant</Text>
        </TouchableOpacity>

        {isModalVisible && (
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              {selectedImage && (
                <Image source={{ uri: selectedImage }} style={styles.modalImage} />
              )}
              <TouchableOpacity style={styles.photoButton} onPress={handleSelectPhoto}>
                <Text style={styles.photoButtonText}>Select Photo</Text>
              </TouchableOpacity>
              <View style={styles.lineBreak}></View>
              <TouchableOpacity style={styles.photoButton} onPress={handleTakePhoto}>
                <Text style={styles.photoButtonText}>Take Photo</Text>
              </TouchableOpacity>
              <View style={styles.closeModalButtonContainer}>
                <TouchableOpacity style={styles.closeModalButton} onPress={toggleModal}>
                  <Icon name="close-circle" color="white" size={30} />
                  <Text style={styles.closeModalButtonText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
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
    width:10,
  }
});

export default HomeScreen;
