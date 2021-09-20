import React from 'react';
import { View, StyleSheet } from 'react-native';

import Text from '../Text';
import theme from '../../theme';

const classes = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: theme.colors.primary,
    padding: 4,
    borderRadius: 3,
  },
});

const Tag = ({ children, ...props }) => {
  return (
    <View style={classes.container}>
      <Text color="white" {...props}>
        {children}
      </Text>
    </View>
  );
};

export default Tag;
