// import { View, Text } from 'react-native'
// import React,{useEffect,useState} from 'react'
// const DataScreen = () => {
//     const [data,setData] = useState([{}])
//     useEffect(()=>{
//         fetch("/members").then(
//             res=>res.json()
//         ).then(
//             data => {
//                 setData(data)
//                 console.log(data)
//             }
//         )
//     }, [])
//   return (
//    <div>
//     {(typeof data.members === 'undefined') ? (
//         <p>Loading....</p>
//     ) : (
//         data.members.map((member,i) => (
//             <p key={i}>{member}</p>
//         ))
//     )}
//    </div>
//   )
// }

// export default DataScreen

import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';

const DataScreen = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/members')
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        console.log(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <View>
      {data.length === 0 ? (
        <Text>Loading....</Text>
      ) : (
        data.map((member, i) => <Text key={i}>{member}</Text>)
      )}
    </View>
  );
};

export default DataScreen;
