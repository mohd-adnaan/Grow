import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useRoute, useNavigation } from '@react-navigation/native';

const SearchPlant = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const data = route.params?.data || [];
  return (
    <View>
      <Text>SearchPlant</Text>
    </View>
  )
}

export default SearchPlant