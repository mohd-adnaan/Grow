// import React from 'react';
// import { View, Image, TouchableOpacity, FlatList, StyleSheet, Text } from 'react-native';
// import { ScrollView } from 'react-native-gesture-handler';
// import { useNavigation } from '@react-navigation/native';
// import Icon from 'react-native-vector-icons/Ionicons';
// import BottomNavigator from "../BottomNavigator/BottomNavigator"
// import ChildScreen from "../ChildScreen/ChildScreen"

// const LandingPage = ({ navigation }) => {
//   return (
//     <View>
//       <BottomNavigator/>

//     </View>
//   );
// };

// export default LandingPage;

import React from 'react';
import { View, StyleSheet } from 'react-native';
import BottomNavigator from "../BottomNavigator/BottomNavigator"

const LandingPage = () => {
  return (
    <View style={styles.container}>
      <BottomNavigator />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end', 
  },
  content: {
    flex: 1,
  },
});

export default LandingPage;
