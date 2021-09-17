import React from 'react';
import { StyleSheet } from 'react-native';

import Text from './Text';

const styles = StyleSheet.create({
  container: {
    paddingVertical: 25,
    paddingHorizontal: 16,
  }
});

const Header = ({ ...props }) => {
  return <Text
    color="white"
    fontSize="subheading"
    fontWeight="bold"
    style={styles.container}
    {...props}
  />;
};

export default Header;
