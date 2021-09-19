import React from 'react';
import { StyleSheet } from 'react-native';
import { Link } from 'react-router-native';

import Header from '../Header';

const classes = StyleSheet.create({
  container: {
    paddingVertical: 25,
    paddingHorizontal: 16,
  }
});

const AppBarTab = ({ header, path }) => {
  return (
    <Link style={classes.container} to={path}>
      <Header>{header}</Header>
    </Link>
  );
};

export default AppBarTab;
