import React from 'react';
import { View, Image, TouchableOpacity, FlatList, StyleSheet ,Text} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

 import img1 from '../../../assets/flower/img1.jpeg';
 import img2 from '../../../assets/flower/img2.jpeg';
 import img3 from '../../../assets/flower/img3.jpeg';
 import img4 from '../../../assets/flower/img4.jpeg';
 import img5 from '../../../assets/flower/img5.jpeg';
 import img6 from '../../../assets/flower/img6.jpeg';
 import img7 from '../../../assets/flower/img7.jpeg';
 import img8 from '../../../assets/flower/img8.jpeg';
 import img9 from '../../../assets/flower/img9.jpeg';
 import img10 from '../../../assets/flower/img10.jpeg';
 import img11 from '../../../assets/flower/img11.jpeg';
 import img12 from '../../../assets/flower/img12.jpeg';
 import img13 from '../../../assets/flower/img13.jpeg';
 import img14 from '../../../assets/flower/img14.jpeg';
 import img15 from '../../../assets/flower/img15.jpeg';
 import img16 from '../../../assets/flower/img16.jpeg';
 import img17 from '../../../assets/flower/img17.jpeg';
 import img18 from '../../../assets/flower/img18.jpeg';
 import img19 from '../../../assets/flower/img19.jpeg';
import img20 from '../../../assets/flower/1_LawsoniaAlba.jpeg';
import img21 from '../../../assets/flower/2_NyctanthesArbortristis.jpeg';
import img22 from '../../../assets/flower/3_ThevetiaNeriifolia.jpeg';
import img23 from '../../../assets/flower/4_CapparisSpinosa.jpeg';
import img24 from '../../../assets/flower/5_EuphorbiaNivulia.jpeg';
import img25 from '../../../assets/flower/6_TerminaliaArjuna.jpeg';
import img26 from '../../../assets/flower/7_PeltophorumInerme.png';
import img27 from '../../../assets/flower/8_ButeaMonosperma.jpg';
import img28 from '../../../assets/flower/9_BauhiniaPurpurea.jpg';
import img29 from '../../../assets/flower/10_BTomentosa.jpeg';
import img30 from '../../../assets/flower/11_TamarindusIndica.jpg';
import img31 from '../../../assets/flower/12_AzadirachtaIndica.jpg';
import img32 from '../../../assets/flower/13_AegleMarmelos.jpg';
import img33 from '../../../assets/flower/14_AilanthusExcelsa.jpeg';
import img34 from '../../../assets/flower/15_SoymidaFebrifuga.jpeg';
import img35 from '../../../assets/flower/1_LawsoniaAlba.jpeg';
import img36 from '../../../assets/flower/2_NyctanthesArbortristis.jpeg';
import img37 from '../../../assets/flower/3_ThevetiaNeriifolia.jpeg';
import img38 from '../../../assets/flower/4_CapparisSpinosa.jpeg';

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
   img20,
   img21,
   img22,
   img23,
   img24,
   img25,
   img26,
   img27,
   img28,
   img29,
   img30,
   img31,
   img32,
   img33,
   img34,
   img35,
   img36,
   img37,
   img38,
 ];

 const logoName = require("../../../assets/Images/logoName.png");
 const logo = require("../../../assets/Images/plantogo.png");
 const PlantData = ({ navigation }) => {
   return (
     <View style={styles.container}>
 
       <ScrollView style={styles.scrollView}>
         {images.map((image, index) => (
           <TouchableOpacity
             key={index}
             onPress={() => {
               // navigation.navigate('UserScreen',/**parameters */)
             }}
           >
             <View style={styles.imageContainer}>
               <Image source={image} style={styles.image} />
               {/* <Text style={styles.imageName}> </Text> */}
             </View>
           </TouchableOpacity>
         ))}
         
       </ScrollView>
     
     </View>
   );
 };
 
 const styles = StyleSheet.create({
   container: {
     flex: 1,
     backgroundColor: '#fff',
   },
   scrollView: {
     padding: 15,
   },
   imageContainer: {
     marginBottom: 20,
     borderRadius: 10, 
     overflow: 'hidden', 
   },
   image: {
     width: '100%',
     height: 250, 
     resizeMode: 'cover',
   },
   imageName: {
     fontSize: 16,
     fontWeight: 'bold',
     marginTop: 10,
     textAlign: 'center',
   },
 });
 
 export default PlantData;