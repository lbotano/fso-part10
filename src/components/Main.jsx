import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Route, Switch, Redirect, useHistory } from 'react-router-native';

import theme from '../theme';
import AppBar from './AppBar';
import SignIn from './SignIn';
import RepositoryList from './RepositoryList';
import useAuthStorage from '../hooks/useAuthStorage';
import useSignIn from '../hooks/useSignIn';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.background,
  },
});

const Main = () => {
  const history = useHistory();
  const authStorage = useAuthStorage();
  const redirect = async () => {
    if (await authStorage.getAccessToken()) {
      history.push('/');
    }
  };
  useEffect(() => { redirect(); }, []);

  const [signIn] = useSignIn();
  const login = async ({ username, password }) => {
    try {
      const { data } = await signIn({ username, password });
      redirect();
      console.log(data);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View style={styles.container}>
      <AppBar />
      <Switch>
        <Route path="/sign-in" exact>
          <SignIn handleSubmit={login} />
        </Route>
        <Route path="/" exact>
          <RepositoryList />
        </Route>
        <Redirect to="/" />
      </Switch>
    </View>
  );
};

export default Main;
