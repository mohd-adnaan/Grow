import React from 'react';
import { View, Image, TouchableOpacity, FlatList, StyleSheet ,Text} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

 import img1 from '../../../assets/flower/1_Lawsonia alba.jpeg';
 import img2 from '../../../assets/flower/2_Nyctanthes arbortristis.jpeg';
 import img3 from '../../../assets/flower/3_Thevetia neriifolia.jpeg';
 import img4 from '../../../assets/flower/4_Capparis spinosa.jpeg';
 import img5 from '../../../assets/flower/5_Euphorbia nivulia.jpeg';
 import img6 from '../../../assets/flower/6_Terminalia arjuna.jpeg';
 import img7 from '../../../assets/flower/7_Peltophorum-Inerme.png';
 import img8 from '../../../assets/flower/8_Butea-monosperma.jpg';
 import img9 from '../../../assets/flower/9_Bauhinia purpurea.jpg';
 import img10 from '../../../assets/flower/10_B. tomentosa.jpeg';
 import img11 from '../../../assets/flower/11_Tamarindus indica.jpg';
 import img12 from '../../../assets/flower/12_Azadirachta indica.jpg';
 import img13 from '../../../assets/flower/13_Aegle marmelos.jpg';
 import img14 from '../../../assets/flower/14_Ailanthus excelsa.jpeg';
 import img15 from '../../../assets/flower/15_Soymida febrifuga.jpeg';
 import img16 from '../../../assets/flower/1_Lawsonia alba.jpeg';
 import img17 from '../../../assets/flower/2_Nyctanthes arbortristis.jpeg';
 import img18 from '../../../assets/flower/3_Thevetia neriifolia.jpeg';
 import img19 from '../../../assets/flower/4_Capparis spinosa.jpeg';

 const images = [
   img1,
   img2,
   img3,
   img4,
   img5,
   img6,
   img7,
   img8,
   img9,
   img10,
   img11,
   img12,
   img13,
   img14,
   img15,
   img16,
   img17,
   img18,
   img19,
 ];
const numColumns = 2;
const logoName = require("../../../assets/Images/logoName.png");
const logo = require("../../../assets/Images/plantogo.png");
const MainScreen2 = ({ navigation }) => {
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.imageContainer}>
      <Image source={item} style={styles.image} />
    </TouchableOpacity>
  );
// resizeMethod='contain'
  return (
    <View style={styles.container}>
      <View style={styles.headerStyle}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" color="black" size={40} />
      </TouchableOpacity>
      <Image source={logoName} style={styles.logoName}/>
      </View>
      <FlatList
        data={images}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={numColumns}
        contentContainerStyle={styles.flatListContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', 
  },
  flatListContainer: {
    padding: 8,
  },
  imageContainer: {
    flex: 1,
    aspectRatio: 1,
    margin: 4,
    borderRadius: 10, // Add a curved border
    overflow: 'hidden',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
  },
  headerStyle: {
    backgroundColor: '#C3EDC0',
    paddingVertical: 22,
    alignItems: 'center',
  },
  logoName: {
    width: 120,
    height: 30,
    alignSelf: 'center',
  },
  backButtonText: {
    fontSize: 18,
    color: 'black',
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default MainScreen2;

// import React from 'react';
// import { View, Image, TouchableOpacity, FlatList, StyleSheet ,Text} from 'react-native';
// import { ScrollView } from 'react-native-gesture-handler';
// import { useNavigation } from '@react-navigation/native';
// import Icon from 'react-native-vector-icons/Ionicons';

// import { NavigationContainer } from '@react-navigation/native';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// import LandingPage from '../LandingPage/LandingPage.js';

// const numColumns = 2;
// const logoName = require("../../../assets/Images/logoName.png");
// const logo = require("../../../assets/Images/plantogo.png");
// const MainScreen2 = ({ navigation }) => {
//   const renderItem = ({ item }) => (
//     <TouchableOpacity style={styles.imageContainer}>
//       <Image source={item} style={styles.image} />
//     </TouchableOpacity>
//   );

//   return (
//     <View style={styles.container}>
//       <View style={styles.headerStyle}>
//         <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
//           <Icon name="arrow-back" color="black" size={40} />
//         </TouchableOpacity>
//         <Image source={logoName} style={styles.logoName} resizeMethod='contain'/>
//       </View>

//       <View style={{flex: 1, alignment: 'center', justifyContect: 'center'}}>
//         <Text>Hello</Text>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff', 
//   },
//   flatListContainer: {
//     padding: 8,
//   },
//   imageContainer: {
//     flex: 1,
//     aspectRatio: 1,
//     margin: 4,
//     borderRadius: 10, // Add a curved border
//     overflow: 'hidden',
//   },
//   image: {
//     flex: 1,
//     resizeMode: 'cover',
//   },
//   headerStyle: {
//     backgroundColor: '#C3EDC0',
//     paddingVertical: 22,
//     alignItems: 'center',
//   },
//   logoName: {
//     width: 120,
//     height: 30,
//     alignSelf: 'center',
//   },
//   backButtonText: {
//     fontSize: 18,
//     color: 'black',
//   },
//   backButton: {
//     position: 'absolute',
//     top: 10,
//     left: 10,
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
// });

// export default MainScreen2;