import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useRoute, useNavigation } from '@react-navigation/native';

import Abies from '../../../assets/plantImages/Abies.jpg';

const images = [Abies];

const PlantDetails = () => {
  const route = useRoute();
  const { data } = route.params;
  const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          {images.map((image, index) => (
            <TouchableOpacity key={index} onPress={() => {}}>
              <View style={styles.imageContainer}>
                <Image source={image} style={styles.image} />
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" color="black" size={30} />
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>

      <Text style={styles.jsonText}>{JSON.stringify(data, null, 2)}</Text>
      <Text style={styles.nameText}>{data.name}</Text>
    </ScrollView>
  );
};

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  jsonText: {
    fontSize: 16,
    color: 'black',
    marginBottom: 10,
  },
  nameText: {
    fontSize: 16,
    color: 'black',
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
  itemButton: {
    backgroundColor: '#C3EDC0',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 5,
    borderRadius: 10,
  },
  scrollView: {
    padding: 15,
  },
  imageContainer: {
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  imageName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
  },
};

export default PlantDetails;
