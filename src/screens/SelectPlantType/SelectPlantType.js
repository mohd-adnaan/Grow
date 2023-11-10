import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const SelectPlantType = () => {
  const route = useRoute();
  const { district, state } = route.params;
  const navigation = useNavigation();
  const [selectedItem, setSelectedItem] = useState(null);

  const fetchPlantData = async (district, state, name) => {
    try {
      console.log('Passed district:', district);
      console.log('Passed state:', state);
      console.log('Passed name:', name);
  
      const encodedDistrict = encodeURIComponent(district);
      const encodedState = encodeURIComponent(state);
      const encodedName = encodeURIComponent(name);
  
      const response = await fetch(`http://192.168.137.224:3000/plant_data_detailed?district=${encodedDistrict}&state=${encodedState}&name=${encodedName}`, {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const data = await response.json();
      console.log('Plant Data:', data);
      navigation.navigate('PlantDetails', { data });
    } catch (error) {
      console.error('Error:', error);
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
            onPress={() => handleItemClick(item.name)}
          >
            <Icon name={item.icon} size={30} color="black" />
            <Text style={styles.itemText}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
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
};

export default SelectPlantType;
