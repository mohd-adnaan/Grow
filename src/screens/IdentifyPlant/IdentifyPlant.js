import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Linking, ScrollView } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import storage from '@react-native-firebase/storage';

const IdentifyPlant = () => {
  const [imageData, setImageData] = useState(null);
  const [fullImgRefPath, setFullImgRefPath] = useState('');
  const [imgDownloadUrl, setImgDownloadUrl] = useState('');

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
    } catch (err) {
      console.error(err);
    }
  };

  const deleteImage = async () => {
    try {
      await storage().ref(fullImgRefPath).delete();
    } catch (err) {
      console.error(err);
    }
  };

  return  (
    <ScrollView contentContainerStyle={styles.container}>

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
    backgroundColor: '#C3EDC0',
  },
  image: {
    height: 200,
    width: 200,
    marginBottom: 20,
    borderRadius: 15,
  },
  noImageText: {
    marginBottom: 20,
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
  urlContainer: {
    marginTop: 30,
  },
  urlText: {
    fontSize: 16,
  },
  downloadedImage: {
    height: 300,
    width: 300,
    borderRadius: 15,
  },
});

export default IdentifyPlant;
