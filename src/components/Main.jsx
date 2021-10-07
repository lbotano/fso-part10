import React, { useEffect } from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import { Route, Switch, Redirect, useHistory } from 'react-router-native';

import theme from '../theme';
import AppBar from './AppBar';
import SignIn from './SignIn';
import SignUp from './SignUp';
import RepositoryList from './RepositoryList';
import SingleRepository from './RepositoryList/SingleRepository';
import CreateReview from './CreateReview';
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
      await signIn({ username, password });
      redirect();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.contrast} />
      <AppBar />
      <Switch>
        <Route path="/repository/:id">
          <SingleRepository />
        </Route>
        <Route path="/sign-in" exact>
          <SignIn handleSubmit={login} />
        </Route>
        <Route path="/sign-up" exact>
          <SignUp onSubmit={login} />
        </Route>
        <Route path="/create-review" exact>
          <CreateReview />
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
