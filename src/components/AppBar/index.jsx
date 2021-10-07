import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { useQuery } from '@apollo/client';

import theme from '../../theme';
import AppBarTab from './AppBarTab';
import SignOutTab from './SignOutTab';
import Text from '../Text';
import { AUTHORIZED_USER } from '../../graphql/queries';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.contrast,
  },
});

const AppBar = () => {
  const { data, loading, error } = useQuery(AUTHORIZED_USER, {
    fetchPolicy: 'cache-and-network',
  });

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
