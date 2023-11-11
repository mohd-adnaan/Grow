import React, { useState } from 'react';
import { View, Text,TextInput, TouchableOpacity, Image, StyleSheet, Linking, ScrollView } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import storage from '@react-native-firebase/storage';
import Search from "../../../assets/Images/search.png";
import Animated, { useSharedValue, withTiming, Easing } from 'react-native-reanimated';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';

const IdentifyPlant = () => {
  const [imageData, setImageData] = useState(null);
  const [fullImgRefPath, setFullImgRefPath] = useState('');
  const [imgDownloadUrl, setImgDownloadUrl] = useState('');
  const [plantName, setPlantName] = useState('');
  const [identifyPlant, setIdentifyPlant] = useState(false);
  const project = 'all';
  const apiKey = '9mawufMYr0WYNoHUKAV6OmdWAPajTCQ0RUY9LNwXU9Q0hbkpZQ';
  const API_DETECT_URL = `https://plant.id/api/v3/identify/${project}?api-key=${apiKey}`;
  const [searchBarVisible, setSearchBarVisible] = useState(false);
  const [placeholderText, setPlaceholderText] = useState('Search Here');

  const toggleSearchBar = () => {
      setSearchBarVisible(!searchBarVisible);
    };

  const handleSearchButton = () => {
      navigation.navigate('SearchPlant',{plantName});
    }  
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
      const response = storage().ref(`/profile/${imageData.name}`);
      const put = await response.putFile(imageData.uri);

      setFullImgRefPath(put.metadata.fullPath);
      const url = await response.getDownloadURL();
      setImgDownloadUrl(url);
      alert('Image Uploaded Successfully');
      setIdentifyPlant(true);
    } catch (err) {
      console.error(err);
    }
  };
  const deleteImage = async () => {
    try {
      await storage().ref(fullImgRefPath).delete();
      setIdentifyPlant(false);
      console.log('Image deleted successfully.');
    } catch (err) {
      console.error(err);
    }
  };
  const identifyPlantFunction = async () => {
    try {
      if (!imageData) {
        console.warn('No image data available.');
        return;
      }
      const formData = new FormData();
      formData.append('file', {
        uri: imageData.uri,
        type: 'image/jpeg',
        name: imageData.name,
      });
  
      const response = await fetch(API_DETECT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });
  
      if (response.ok) {
        const result = await response.json();
        console.log('Plant identification result:', result);
      } else {
        console.error('Plant identification failed', response.statusText);
      }
    } catch (err) {
      console.error('Error identifying plant', err);
    }
  };
  
  return (
    <ScrollView contentContainerStyle={styles.container}>
     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
     {searchBarVisible && (  
  <Animatable.View
    animation={searchBarVisible ? 'slideInRight' : 'slideOutRight'}
    style={{
      width: 340,
      height: 50,
      borderRadius: 10,
      flexDirection: 'row',
      alignItems: 'left',
    }}
  >
    <LinearGradient colors={['#C3EDC0', '#77CC77']} style={{ flex: 1, borderRadius: 10 }}>
      <TextInput style={{ width: '100%',marginLeft:20 }} placeholder={'Search Here'} />
    </LinearGradient>
  </Animatable.View>
)}
            {!searchBarVisible && (
              <View style = {{margin:4}}>
              <TouchableOpacity onPress={toggleSearchBar}>
                <Image source={require('../../../assets/Images/search.png')} style={{ width: 35, height: 35, padding: 10}} />
              </TouchableOpacity>
              </View>
            )}
            {searchBarVisible && (
              <View style ={{margin:-16}}>
              <TouchableOpacity onPress={toggleSearchBar}>
                <Image source={require('../../../assets/Images/cancel.png')} style={{ width: 28, height: 28}} />
              </TouchableOpacity>
              </View>
            )}
            </View>
      <View style={styles.container}>
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
          <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={deleteImage}>
            <Text style={styles.buttonText}>Delete Image</Text>
          </TouchableOpacity>
          {identifyPlant && (
            <TouchableOpacity style={[styles.button, styles.IdentifyPlantButton]} onPress={identifyPlantFunction}>
              <Text style={styles.buttonText}>Identify Plant</Text>
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity onPress={() => imgDownloadUrl && Linking.openURL(imgDownloadUrl)}>
          <Text style={styles.urlText}>
            Url = {imgDownloadUrl.length > 0 ? imgDownloadUrl : 'not found'}
          </Text>
        </TouchableOpacity>
        <Image source={{ uri: imgDownloadUrl }} style={styles.downloadedImage} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  image: {
    height: 200,
    width: 200,
    marginBottom: 20,
    borderRadius: 15,
  },
  noImageText: {
    marginBottom: 20,
    color: 'black',
  },
  buttonsContainer: {
    width: '100%',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    width: '100%',
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
});

export default IdentifyPlant;
