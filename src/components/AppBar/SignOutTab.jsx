import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { useApolloClient } from '@apollo/client';

import Header from '../Header';
import useAuthStorage from '../../hooks/useAuthStorage';

const classes = StyleSheet.create({
  container: {
    paddingVertical: 25,
    paddingHorizontal: 16,
  },
});

const SignOutTab = ({ header = 'Sign out' }) => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const logout = () => {
    authStorage.removeAccessToken();
    apolloClient.resetStore();
  };

  return (
    <Pressable style={classes.container} onPress={logout}>
      <Header>{ header }</Header>
    </Pressable>
  );
};

export default SignOutTab;
