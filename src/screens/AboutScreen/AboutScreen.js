import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Hyperlink from 'react-native-hyperlink';
import aboutImage from '../../../assets/Images/plantlogo.png';

const AboutScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Icon
            name="arrow-back"
            color="gray"
            size={30}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.heading}>About the Grow App</Text>
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.imageContainer}>
            <Image source={aboutImage} style={styles.image} resizeMode="contain" />
          </View>
          <View style={styles.description}>
            <Text style={styles.descriptionText}>
            A gardening recommendation system can be a valuable tool for gardening enthusiasts, especially for those who are new to gardening or seeking expert advice on cultivating specific plants. The system can provide personalized recommendations and guidance based on factors such as the user's location, climate, soil type, gardening experience, and preferences. Here are some key features and components you can consider for a gardening recommendation system:
            </Text>
            <Text style={styles.descriptionText}>
            Plant Care Tips: Provide detailed care instructions for each recommended plant, including watering schedules, fertilization, pruning, and pest control.
            </Text>
            <Text style={styles.descriptionText}>
            Problem Diagnosis: Integrate a plant problem diagnosis feature that allows users to upload images of their plants and receive advice on identifying and treating common plant issues.
            </Text>
            <Hyperlink linkDefault={true} linkStyle={styles.link}>
              <Text style={styles.linkText}>For more information, visit: www.wikipedia.com</Text>
            </Hyperlink>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#BFAABB',//#E4EAF7'
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  heading: {
    flex: 1,
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  contentContainer: {
    alignItems: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  image: {
    width: 200,
    height: 200,
  },
  description: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#C3EDC0',
    width: '90%',
    marginBottom: 20,
  },
  descriptionText: {
    fontSize: 16,
    color: '#000',
    textAlign: 'justify',
    marginBottom: 10,
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  linkText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
});

export default AboutScreen;