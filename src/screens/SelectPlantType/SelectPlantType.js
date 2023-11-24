import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ActivityIndicator } from 'react-native';

const SelectPlantType = () => {
  const route = useRoute();
  const { district, state } = route.params;
  const navigation = useNavigation();
  const [selectedItem, setSelectedItem] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPlantData = async (district, state, name) => {
    try {
      console.log('Passed district:', district);
      console.log('Passed state:', state);
      console.log('Passed name:', name);
  
      const encodedDistrict = encodeURIComponent(district);
      const encodedState = encodeURIComponent(state);
      const encodedName = encodeURIComponent(name);
      //192.168.63.161
      //192.168.206.161
      //10.2.20.38
      const response = await fetch(`http://192.168.247.161:3000/plant_data_detailed?district=${encodedDistrict}&state=${encodedState}&name=${encodedName}`, {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const data = await response.json();
      console.log('Plant Data:', data);
      setIsLoading(false); 
      navigation.navigate('PlantDetails', { data });
      setIsLoading(false); 
    } catch (error) {
      console.error('Error:', error);
      setIsLoading(false); 
    }
  };
  
  useEffect(() => {
    if (selectedItem) {
      fetchPlantData(district, state, selectedItem);
    }
  }, [district, state, selectedItem]);

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const itemList = [
    { name: "Shrubs with fragrant flowers", icon: 'flower' },
    { name: "Ornamental and flowering trees", icon: 'tree' },
    { name: "Trees with ornamental foliage", icon: 'leaf' },
    { name: "Shade trees", icon: 'weather-sunny' },
    { name: "Palm", icon: 'palm-tree' },
    { name: "Exotic", icon: 'earth' }
  ];
  

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" color="black" size={30} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Select Plant Type</Text>
      </View>
      
      <View style={styles.itemsContainer}>
        {itemList.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.itemButton, selectedItem === item.name && styles.selectedItem]}
            onPress={() => {
              setIsLoading(true); 
              handleItemClick(item.name);
            }}
          >
            <Icon name={item.icon} size={30} color="black" />
            <Text style={styles.itemText}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="x-large" color="#77CC77" />
          <Text style={styles.loadingText}>Please wait.....</Text>
        </View>
      ) : null}
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F8F8F8',
  },
  itemsContainer: {
    flex: 1, 
    justifyContent: 'center', 

  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 20,
    marginLeft: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  itemButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E1F1E1',
    paddingVertical: 18,
    paddingHorizontal: 20,
    marginBottom: 12,
    borderRadius: 12,
  },
  selectedItem: {
    backgroundColor: '#77CC77',
  },
  itemText: {
    fontSize: 18,
    marginLeft: 10,
    color: 'black',
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
  loadingText: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    fontFamily: 'Helvetica',
  },

};

export default SelectPlantType;
