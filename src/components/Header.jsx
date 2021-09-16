import React from 'react';
import { StyleSheet } from 'react-native';

import theme from '../theme';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold,
    paddingVertical: 25,
    paddingHorizontal: 16,
  }
});

const Header = ({ ...props }) => {
  return <Text style={styles.container} {...props}/>;
};

export default Header;
