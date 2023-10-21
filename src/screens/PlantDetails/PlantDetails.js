import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useRoute, useNavigation } from '@react-navigation/native';  // Import useRoute
import PlantDetails from '.';

const PlantDetails = () => {
  const route = useRoute();  // Use useRoute to get route params
  const { district, state } = route.params;
  const navigation = useNavigation(); // Get navigation prop

  const fetchPlantData = async (district, state, name) => {
    try {
      console.log('Passed district:', district);
      console.log('Passed state:', state);
      const response = await fetch(`http://10.12.200.198:3000/plant_data_detailed?district=${district}&state=${state}&name=${name}`, {
        method: 'get',
      });
      const data = await response.json();
      console.log('Plant Data:', data);
    } catch (error) {
      console.error('Error 404 :// :', error);
    }
  };

  useEffect(() => {
    fetchPlantData(district, state, name);
  }, [district, state, name]);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" color="black" size={30} />
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
    
    </View>
  );
};


const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color:'black',
  },
};

export default PlantDetails;
