
import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const CustomInput = ({
  value,
  setValue,
  placeholder,
  secureTextEntry,
  onBlur,
}) => {
  // const handleChange = (text) => {
  //   const regex = /^[^!-\/:-@\[-`{-~]+$/;
  //   if (!regex.test(text)) {
  //     return;
  //   }
  //   setValue(text);
  // };
  // const handleChange = (text) => {
  //   const regex = /^[^!-\/:-@\[-`{-~]+$/;
  //   if (regex.test(text) || text === '' || text === ',' || text === '-' || text === '/' || text ==='&') {
  //     setValue(text);
  //   }
  // };
  // const handleChange = (text) => {
  //   const regex = /^[^!-\/:-@\[-`{-~\s]+$|^[\s/-]+$/;
  //   if (regex.test(text) || text === '' || text === ',' || text === '&' || text === '-' || text === '/') {
  //     setValue(text);
  //   }
  // };
  const handleChange = (text) => {
    const regex = /^[\w\s,/&-]*$/;
    if (regex.test(text)) {
      setValue(text);
    }
  };
  const validatePhoneNumber = (text) => {
    const phoneRegex = /^[0-9]{0,10}$/;
    return phoneRegex.test(text);
  };

  
  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        onChangeText={handleChange}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        onBlur={onBlur}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '100%',
    borderColor: '#e8e8e8',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  input: {},
});

export default CustomInput;