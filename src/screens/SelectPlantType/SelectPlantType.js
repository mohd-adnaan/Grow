import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useRoute, useNavigation } from '@react-navigation/native';

const SelectPlantType = () => {
  const route = useRoute();
  const { district, state } = route.params;
  const navigation = useNavigation();

  const [selectedItem, setSelectedItem] = useState(null);

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
    "Shrubs with fragrant flowers",
    "Ornamental and flowering trees",
    "Trees with ornamental foliage",
    "Shade trees",
    "Palm",
    "Exotic"
  ];

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" color="black" size={30} />
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>

      {itemList.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.itemButton, selectedItem === item && styles.selectedItem]}
          onPress={() => handleItemClick(item)}
        >
          <Text style={styles.itemText}>{item}</Text>
        </TouchableOpacity>
      ))}
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
  itemButton: {
    backgroundColor: '#C3EDC0',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 5,
    borderRadius: 10,
  },
  selectedItem: {
    backgroundColor: '#77CC77', // Change the color for selected item
  },
  itemText: {
    fontSize: 16,
    color: 'black',
  },
};

export default SelectPlantType;
