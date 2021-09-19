import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';

import theme from '../theme';
import Text from './Text';
import FormikTextInput from './FormikTextInput';
import useSignIn from '../hooks/useSignIn';

const classes = StyleSheet.create({
  form: {
    padding: 10,
    backgroundColor: theme.colors.white,
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 3,
  },
});

const initialValues = {
  username: '',
  password: '',
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required'),
  password: yup
    .string()
    .required('Password is required'),
});

const SignIn = () => {
  const [signIn, result] = useSignIn();
  const handleSubmit = async (values) => {
    const { username, password } = values;
    try {
      const { data } = await signIn({ username, password });
      console.log(data);
    } catch (e) {
      console.error(e);
    }
  };

  if (result.loading) {
    return <Text>Loading...</Text>;
  }
  if (result.error) {
    return <Text color="error" fontWeight="bold">Error: {result.error.message}</Text>;
  }
  if (result.user) {
    return <Text>Logged in as {result.user.username}</Text>;
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

const SignInForm = ({ onSubmit }) => {
  return (
    <View style={classes.form}>
      <FormikTextInput name="username" placeholder="Username" />
      <FormikTextInput name="password" placeholder="Password" secureTextEntry />
      <Pressable style={classes.button} onPress={onSubmit}>
        <Text color="white" fontWeight="bold" fontSize="subheading">Sign in</Text>
      </Pressable>
    </View>
  );
};

export default SignIn;
