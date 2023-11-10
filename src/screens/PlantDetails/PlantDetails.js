import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useRoute, useNavigation } from '@react-navigation/native';

const PlantDetails = () => {
  const route = useRoute();
  const { data } = route.params;
  const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" color="black" size={30} />
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>

      {data.map((plant, index) => (
        <View key={index} style={styles.plantContainer}>
          <Text style={styles.nameText}>{plant.comm_names.join(', ')}</Text>
          <Text style={styles.dataTextHeading}>Can be grown at Home: <Text style={styles.text}>{plant.can_be_grown_at_home}</Text></Text>
          <Text style={styles.dataTextHeading}>Common name: <Text style={styles.text}>{plant.comm_names.join(', ')}</Text></Text>
          <Text style={styles.dataTextHeading}>Companion Plant: <Text style={styles.text}>{plant.companion_plants.join(', ')}</Text></Text>
          <Text style={styles.dataTextHeading}>Description:<Text style={styles.text}>{plant.description}</Text></Text>
          <Text style={styles.dataTextHeading}>Growth Rate: <Text style={styles.text}>{plant.growth_rate}</Text></Text>
          <Text style={styles.dataTextHeading}>Harvesting Information:<Text style={styles.text}>{plant.harvesting_information}</Text></Text> 
          <Text style={styles.dataTextHeading}>Light Requirements: <Text style={styles.text}>{plant.light_requirements}</Text></Text>
          <Text style={styles.dataTextHeading}>Origin and Habitat: <Text style={styles.text}>{plant.origin_and_habitat}</Text></Text>
          <Text style={styles.dataTextHeading}>Pest and Disease Management: <Text style={styles.text}>{plant.pest_and_disease_management}</Text></Text>
          <Text style={styles.dataTextHeading}>Planting and Spacing: <Text style={styles.text}>{plant.planting_and_spacing}</Text></Text>
          <Text style={styles.dataTextHeading}>Scientific Name: <Text style={styles.text}>{plant.scientific_name}</Text></Text>
          <Text style={styles.dataTextHeading}>Seasonal Tips:<Text style={styles.text}>{plant.seasonal_tips}</Text></Text> 
          <Text style={styles.dataTextHeading}>Soil Type: <Text style={styles.text}>{plant.soil_type}</Text></Text>
          <Text style={styles.dataTextHeading}>Watering Guidelines: <Text style={styles.text}>{plant.watering_guidelines}</Text></Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = {
  container: {
    padding: 50,
    backgroundColor: '#fff',
  },
  nameText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
  },
  text:{
    fontSize: 16,
    color: 'black',
    marginBottom: 5,
  },
  dataTextHeading:{
    fontSize: 20,
    paddingTop: 20,
    color: '#000',
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
  plantContainer: {
    marginBottom: 20,
  },
};

export default PlantDetails;
