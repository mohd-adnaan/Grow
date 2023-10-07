import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import PlantData from '../PlantData/PlantData'
import IdentifyPlant from '../IdentifyPlant/IdentifyPlant';
import WeatherScreen from '../WeatherScreen/WeatherScreen';
import ChangeLocation from '../ChangeLocation/ChangeLocation';
import { View, Text, StyleSheet } from 'react-native';

const Bottom = createBottomTabNavigator();

const BottomNavigator = () => {
  return (
    <Bottom.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'PlantData') {
            iconName = focused ?'flower' : 'flower-outline';
          } else if (route.name === 'IdentifyPlant') {
            // iconName = focused ? 'list' : 'list';
            iconName = focused ? 'search' : 'search-outline';
          } else if (route.name === 'Weather') {
            iconName = focused ? 'cloudy' : 'cloudy-outline';
          } else if (route.name === 'ChangeLocation'){
            iconName = focused ? 'location' : 'location-outline'; 
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'blue',
        inactiveTintColor: 'gray', 
        style: styles.tabBar,
        labelStyle: styles.tabLabel,
      }}
    >
      <Bottom.Screen name="PlantData" component={PlantData} options={{ headerShown: false }} />
      <Bottom.Screen name="IdentifyPlant" component={IdentifyPlant} options={{ headerShown: false }} />
      <Bottom.Screen name="ChangeLocation" component={ChangeLocation} option={{ headerShown: false }}/>
      <Bottom.Screen name="Weather" component={WeatherScreen} options={{ headerShown: false }} />
    </Bottom.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: 'white', 
  },
  tabLabel: {
    fontSize: 12,
  },
});

export default BottomNavigator;