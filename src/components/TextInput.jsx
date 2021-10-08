import React from 'react';
import { TextInput as NativeTextInput, StyleSheet } from 'react-native';

import theme from '../theme';

const styles = StyleSheet.create({
  text: {
    borderColor: theme.colors.textSecondary,
    borderWidth: 1,
    borderRadius: 3,
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginBottom: 10
  },
});

const TextInput = ({ style, ...props }) => {
  const textInputStyle = [styles.text, style];

  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;
