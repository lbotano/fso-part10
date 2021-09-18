import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { Formik } from 'formik';

import theme from '../theme';
import Text from './Text';
import FormikTextInput from './FormikTextInput';

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

const SignIn = () => {
  const handleSubmit = (values) => {
    console.log(values);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
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
