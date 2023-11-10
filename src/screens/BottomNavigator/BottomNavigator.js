import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import IdentifyPlant from '../IdentifyPlant/IdentifyPlant';
import WeatherScreen from '../WeatherScreen/WeatherScreen';
import ChangeLocation from '../ChangeLocation/ChangeLocation';
import PlantDetails from '../PlantDetails';
import { View, Text, StyleSheet } from 'react-native';
const Bottom = createBottomTabNavigator();
const BottomNavigator = () => {
  return (
    <Bottom.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

           if (route.name === 'PlantDetails') {
             iconName = focused ? 'flower' : 'flower-outline';
           }else if (route.name === 'IdentifyPlant') {
            iconName = focused ? 'search' : 'search-outline';
          } else if (route.name === 'Weather') {
            iconName = focused ? 'cloudy' : 'cloudy-outline';
          } else if (route.name === 'ChangeLocation') {
            iconName = focused ? 'location' : 'location-outline';
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle: {
          fontSize: 12,
        },
        tabBarStyle: [
          {
            display: 'flex',
          },
          null,
        ],
      })}
    >
      <Bottom.Screen name="ChangeLocation" component={ChangeLocation} options={{ headerShown: false }} />
      {/* <Bottom.Screen name="PlantDetails" component={PlantDetails} options={{ headerShown: false }} /> */}
      <Bottom.Screen name="IdentifyPlant" component={IdentifyPlant} options={{ headerShown: false }} />
      <Bottom.Screen name="Weather" component={WeatherScreen} options={{ headerShown: false }} />
    </Bottom.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: 'white',
    height: 90,
  },
  tabLabel: {
    fontSize: 12,
  },
});

export default BottomNavigator;