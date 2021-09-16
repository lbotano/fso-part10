import React from 'react';
import { View, StyleSheet } from 'react-native';

import Text from './Text';

const classes = StyleSheet.create({
  text: {
    textAlign: 'center',
  },
});

const RepositoryItemStat = ({ label, value }) => {
  const roundedValue = Math.round(value / 100) * 100;
  const displayValue = value >= 1000
    ? roundedValue / 1000 + 'k'
    : value;

  return (
    <View>
      <Text style={classes.text} fontWeight="bold">{displayValue}</Text>
      <Text style={classes.text}>{label}</Text>
    </View>
  );
};

export default RepositoryItemStat;
