import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

import theme from '../../theme';
import AppBarTab from './AppBarTab';
import SignOutTab from './SignOutTab';
import Text from '../Text';
import useUser from '../../hooks/useUser';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.contrast,
  },
});

const AppBar = () => {
  const { data, loading, error } = useUser();

  if (error) {
    console.error(error);
    return <Text color="error">Error: {error.message}</Text>;
  }

  if (loading) {
    return <Text>loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab header="Repositories" path="/" />
        {
          data.authorizedUser
            ? (
              <>
                <AppBarTab header="Review form" path="/create-review" />
                <AppBarTab header="My reviews" path="/my-reviews" />
                <SignOutTab />
              </>
            )
            : (
              <>
                <AppBarTab header="Sign in" path="/sign-in" />
                <AppBarTab header="Sign up" path="/sign-up" />
              </>
            )
        }
      </ScrollView>
    </View>
  );
};

export default AppBar;
