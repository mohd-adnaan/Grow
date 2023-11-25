import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Linking, ScrollView } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import storage from '@react-native-firebase/storage';
import Search from "../../../assets/Images/search.png";
import Right from "../../../assets/Images/right.png";
import Animated, { useSharedValue, withTiming, Easing } from 'react-native-reanimated';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import { useRoute, useNavigation } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native';


const IdentifyPlant = () => {
  const [imageData, setImageData] = useState(null);
  const [fullImgRefPath, setFullImgRefPath] = useState('');
  const [imgDownloadUrl, setImgDownloadUrl] = useState('');
  const [identifyPlant, setIdentifyPlant] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [URL, setURL] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const [searchBarVisible, setSearchBarVisible] = useState(false);

  const toggleSearchBar = () => {
    setSearchBarVisible(!searchBarVisible);
  };

  const Search = () => {
    PlantSearch(searchText);
    console.log(searchText);
  };

  const PlantSearch = async (plantName) => {
    try {
      console.log('Plant Name:', plantName);
      const encodedplantName = encodeURIComponent(plantName);
      //192.168.63.161
      //10.2.20.38
      const response = await fetch(`http://10.12.200.198:3001/plant_data_detailed?plantName=${encodedplantName}`, {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      console.log('Plant Details:', data);
      navigation.navigate('PlantDetails', { data });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const pickImage = async () => {
    try {
      const response = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.images],
      });
      setImageData(response);
    } catch (err) {
      console.error(err);
    }
  };

  const uploadImage = async () => {
    try {
      if (!imageData) {
        console.warn('No image selected.');
        return;
      }
      const response = storage().ref(`/profile/${imageData.name}`);
      setIsLoading(true); 
      const put = await response.putFile(imageData.uri);
      setFullImgRefPath(put.metadata.fullPath);
      const url = await response.getDownloadURL();
      setImgDownloadUrl(url);
      setURL(url);
      console.log(url)
      alert('Image Uploaded Successfully');
      setIdentifyPlant(true);
      setIsLoading(false); 
    } catch (err) {
      console.error(err);
    }
  };
  const deleteImage = async () => {
    try {
      setIsLoading(true); 
      await storage().ref(fullImgRefPath).delete();
      setIdentifyPlant(false);
      setIsLoading(false); 
      setImageData(null);
      console.log('Image deleted successfully.');
    } catch (err) {
      console.error(err);
    }
  };

  const plantDetection = async () => {
    try {
      if (!imageData) {
        console.warn('No image data available.');
        return;
      }

      const API_KEY = "AIzaSyAD-LGSgqT1fYVIC0KF2s-0fYrLQtOWHd4";
      const API_URL = `https://vision.googleapis.com/v1/images:annotate?key=${API_KEY}`;
  
      const base64ImageData = await encodeImageBase64(imageData.uri);
  
      const requestData = {
        requests: [
          {
            image: {
              content: base64ImageData,
            },
            features: [{type: 'LABEL_DETECTION'}],
          },
        ],
      };
      const data = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });
  
      if (data.ok) {
        const responseData = await data.json();
        console.log(responseData);
        setLabels(responseData.responses[0].labelAnnotations);
      } else {
        console.error('Error Detecting the Plant - API Response:', apiResponse);
        alert('Error Detecting the image. Please try again later');
      }
    } catch (error) {
      console.error('Error Detecting the Plant', error);
      alert('Error Detecting the image. Please try again later');
    }
  };
  
  
  const encodeImageBase64 = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result.split(',')[1]);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(blob);
    });
  };
  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.searchContainer}>
        {searchBarVisible && (
          <Animatable.View
            animation={searchBarVisible ? 'slideInRight' : 'slideOutRight'}
            style={{
              flex: 1, 
              height: 55,
              borderRadius: 10,
              flexDirection: 'row',
              alignItems: 'left',
              overflow: 'hidden',
            }}
          >
            <LinearGradient colors={['#C3EDC0', '#77CC77']} style={{ flex: 1, borderRadius: 10 }}>
            <TextInput
                style={{  flex: 1, marginLeft: 20, fontSize: 18 }}
                placeholder={'Search Here'}
                value={searchText}
                onChangeText={(text) => setSearchText(text)}
              />
            </LinearGradient>
          </Animatable.View>
        )}

        {!searchBarVisible && (
          <View style={styles.SearchPNG}>
            <TouchableOpacity onPress={toggleSearchBar}>
              <Image source={require('../../../assets/Images/search.png')} style={{ width: 50, height: 50, padding: 10}} />
            </TouchableOpacity>
          </View>
        )}
        {searchBarVisible && (
          <View>
            <TouchableOpacity onPress={Search}>
              <Image source={require('../../../assets/Images/right.png')} style={{ width: 37, height: 35 }} />
            </TouchableOpacity>
          </View>
        )}

        {searchBarVisible && (
          <View>
            <TouchableOpacity onPress={toggleSearchBar}>
              <Image source={require('../../../assets/Images/cancel.png')} style={{ width: 27, height: 28 }} />
            </TouchableOpacity>
          </View>
        )}
      </View>
      
      <View style={styles.IdentifyContainer}>
      
        {imageData ? (
          <Image source={{ uri: imageData.uri }} style={styles.image} />
        ) : (
          <Text style={styles.noImageText}>No Image Found</Text>
        )}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.button} onPress={pickImage}>
            <Text style={styles.buttonText}>Select Image</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={uploadImage}>
            <Text style={styles.buttonText}>Upload Image</Text>
          </TouchableOpacity>
          
          {identifyPlant && (
          <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={deleteImage}>
            <Text style={styles.buttonText}>Delete Image</Text>
          </TouchableOpacity>
          )}
          {identifyPlant && (
            <TouchableOpacity style={[styles.button, styles.IdentifyPlantButton]} onPress={plantDetection}>
              <Text style={styles.buttonText}>Identify Plant</Text>
            </TouchableOpacity>
          )}
        </View>
        {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="x-large" color="#77CC77" />
          <Text style={styles.loadingText}>Please wait.....</Text>
        </View>
      ) : null}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  searchContainer:{
  flex: 1,
  top:10,
  justifyContent: 'center',
  flexDirection: 'row' ,
  },
  IdentifyContainer:{
    top:-40,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  SearchPNG: {
    top: 10,
    left: 140,
    padding: 10,
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    zIndex: 999,
  },
  image: {
    height: 300,
    width: 300,
    marginBottom: 20,
    borderRadius: 15,
  },
  noImageText: {
    marginBottom: 20,
    color: 'black',
  },
  buttonsContainer: {
    height: 150, 
    width: '100%',
    marginBottom: 20,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    width: '60%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: 'red',
  },
  IdentifyPlantButton: {
    backgroundColor: '#77CC77',
  },
  urlContainer: {
    marginTop: 30,
  },
  urlText: {
    fontSize: 16,
    color: 'black',
  },
  downloadedImage: {
    height: 300,
    width: 300,
    borderRadius: 15,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    fontFamily: 'Helvetica',
  },
});

export default IdentifyPlant;
