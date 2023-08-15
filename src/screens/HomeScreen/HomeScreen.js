// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Image } from 'react-native';
// import axios from 'axios';

// const API_KEY = '41a58879ed6634523c5164918cf248eb';
// const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=CityName&units=metric&appid=${API_KEY}`;

// const HomeScreen = () => {
//   const [weatherData, setWeatherData] = useState(null);

//   useEffect(() => {
//     fetchWeatherData();
//   }, []);

//   const fetchWeatherData = async () => {
//     try {
//       const response = await axios.get(API_URL.replace('CityName', 'Aligarh'));
//       setWeatherData(response.data);
//     } catch (error) {
//       console.error('Error fetching weather data:', error);
//     }
//   };

//   const getBackgroundImage = () => {
//     if (!weatherData) return require('../../../assets/Images/default.png');
//     const weatherCode = weatherData.weather[0].id;
//     if (weatherCode >= 200 && weatherCode < 600) {
//       return require('../../../assets/Images/rain.png');
//     } else if (weatherCode >= 600 && weatherCode < 700) {
//       return require('../../../assets/Images/snow.png');
//     } else if (weatherCode >= 801 && weatherCode <= 804) {
//       return require('../../../assets/Images/cloudy.png');
//     }
//     return require('../../../assets/Images/sunny.png');
//   };

//   return (
//     <View style={styles.container}>
//       <ImageBackground source={getBackgroundImage()} style={styles.backgroundImage}>
//         {weatherData && (
//           <TouchableOpacity style={styles.weatherInfoContainer}>
//             <Image
//               style={styles.weatherIcon}
//               source={{ uri: `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png` }}
//             />
//             <Text style={styles.temperature}>{weatherData.main.temp}°C</Text>
//             <Text style={styles.description}>{weatherData.weather[0].description}</Text>
//           </TouchableOpacity>
//         )}
//       </ImageBackground>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   backgroundImage: {
//     flex: 1,
//     resizeMode: 'cover',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   weatherInfoContainer: {
//     backgroundColor: 'rgba(255, 255, 255, 0.8)',
//     borderRadius: 20,
//     padding: 20,
//     alignItems: 'center',
//   },
//   weatherIcon: {
//     width: 100,
//     height: 100,
//   },
//   temperature: {
//     fontSize: 36,
//     fontWeight: 'bold',
//     marginTop: 10,
//   },
//   description: {
//     fontSize: 20,
//     marginTop: 5,
//     textAlign: 'center',
//   },
// });

// export default HomeScreen;

// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Image } from 'react-native';
// import axios from 'axios';
// import ImagePicker from 'react-native-image-crop-picker';

// const API_KEY = '41a58879ed6634523c5164918cf248eb';
// const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=CityName&units=metric&appid=${API_KEY}`;

// const HomeScreen = () => {
//   const [weatherData, setWeatherData] = useState(null);

//   useEffect(() => {
//     fetchWeatherData();
//   }, []);

//   const fetchWeatherData = async () => {
//     try {
//       const response = await axios.get(API_URL.replace('CityName', 'Aligarh'));
//       setWeatherData(response.data);
//     } catch (error) {
//       console.error('Error fetching weather data:', error);
//     }
//   };

//   const getBackgroundImage = () => {
//     if (!weatherData) return require('../../../assets/Images/default.png');
//     const weatherCode = weatherData.weather[0].id;
//     if (weatherCode >= 200 && weatherCode < 600) {
//       return require('../../../assets/Images/rain.png');
//     } else if (weatherCode >= 600 && weatherCode < 700) {
//       return require('../../../assets/Images/snow.png');
//     } else if (weatherCode >= 801 && weatherCode <= 804) {
//       return require('../../../assets/Images/cloudy.png');
//     }
//     return require('../../../assets/Images/sunny.png');
//   };

//   const handleSelectPhoto = async () => {
//     try {
//       const image = await ImagePicker.openPicker({
//         mediaType: 'photo',
//         cropping: true,
//         width: 500,
//         height: 500,
//       });

//       // Use the selected image (image.path) in your app
//     } catch (error) {
//       console.log('ImagePicker Error: ', error);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <ImageBackground source={getBackgroundImage()} style={styles.backgroundImage}>
//         {weatherData && (
//           <TouchableOpacity style={styles.weatherInfoContainer}>
//             <Image
//               style={styles.weatherIcon}
//               source={{ uri: `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png` }}
//             />
//             <Text style={styles.temperature}>{weatherData.main.temp}°C</Text>
//             <Text style={styles.description}>{weatherData.weather[0].description}</Text>
//           </TouchableOpacity>
//         )}

//         <TouchableOpacity style={styles.photoButton} onPress={handleSelectPhoto}>
//           <Text style={styles.photoButtonText}>Select Photo</Text>
//         </TouchableOpacity>
//       </ImageBackground>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   backgroundImage: {
//     flex: 1,
//     resizeMode: 'cover',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   weatherInfoContainer: {
//     backgroundColor: 'rgba(255, 255, 255, 0.8)',
//     borderRadius: 20,
//     padding: 20,
//     alignItems: 'center',
//   },
//   weatherIcon: {
//     width: 100,
//     height: 100,
//   },
//   temperature: {
//     fontSize: 36,
//     fontWeight: 'bold',
//     marginTop: 10,
//   },
//   description: {
//     fontSize: 20,
//     marginTop: 5,
//     textAlign: 'center',
//   },
//   photoButton: {
//     backgroundColor: 'rgba(255, 255, 255, 0.8)',
//     borderRadius: 20,
//     padding: 10,
//     margin: 20,
//     alignSelf: 'flex-end',
//   },
//   photoButtonText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });

// export default HomeScreen;



import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';
import ImagePicker from 'react-native-image-crop-picker';
import Permissions from 'react-native-permissions';
const API_KEY = '41a58879ed6634523c5164918cf248eb';
const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=CityName&units=metric&appid=${API_KEY}`;

const HomeScreen = () => {
  const [weatherData, setWeatherData] = useState(null);
  const handleTakePhoto = async () => {
    try {
      const cameraPermission = await Permissions.request('camera');

      if (cameraPermission === 'granted') {
        const options = {
          mediaType: 'photo',
          cropping: true,
          width: 500,
          height: 500,
        };

        const image = await ImagePicker.openCamera(options);

        // Use the taken image (image.path) in your app
      } else {
        console.log('Camera permission denied');
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };
  useEffect(() => {
    fetchWeatherData();
  }, []);

  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(API_URL.replace('CityName', 'Aligarh'));
      setWeatherData(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
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



  return (
    <View style={styles.container}>
      <ImageBackground source={getBackgroundImage()} style={styles.backgroundImage}>
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
});

export default HomeScreen;
