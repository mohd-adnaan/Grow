import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { Pressable } from 'react-native';


const CustomButton = ({onPress, text, type = 'PRIMARY', bgColor, fgColor}) => {
  return (
    <Pressable onPress={onPress} style={[styles.container,styles[`container_${type}`],
        bgColor ? {backgroundColor: bgColor} : {},
      ]}>
      <Text
        style={[
          styles.text,
          styles[`text_${type}`],
          fgColor ? {color: fgColor} : {},
        ]}>
        {text}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',

    padding: 15,
    marginVertical: 5,

    alignItems: 'center',
    borderRadius: 5,
  },

  container_PRIMARY: {
    backgroundColor: '#77CC77',
  },

  container_SECONDARY: {
    borderColor: '#77CC77',
    borderWidth: 2,
  },

  container_TERTIARY: {},

  text: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 17,
  },

  text_SECONDARY: {
    color: '#77CC77',
  },

  text_TERTIARY: {
    color: 'gray',
  },
});

export default CustomButton;