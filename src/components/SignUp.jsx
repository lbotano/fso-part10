import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';

import theme from '../theme';
import Text from './Text';
import FormikTextInput from './FormikTextInput';
import useSignUp from '../hooks/useSignUp';

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
  passwordConfirm: '',
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(1)
    .max(30)
    .required('Username is required'),
  password: yup
    .string()
    .min(5)
    .max(50)
    .required('Password is required'),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must be the same')
    .required('Password confirmation is required')
});

const SignUpForm = ({ onSubmit }) => {
  return (
    <View style={classes.form}>
      <FormikTextInput name="username" placeholder="Username" />
      <FormikTextInput name="password" placeholder="Password" secureTextEntry />
      <FormikTextInput name="passwordConfirm" placeholder="Password confirmation" secureTextEntry />
      <Pressable style={classes.button} onPress={onSubmit}>
        <Text color="white" fontWeight="bold" fontSize="subheading">Sign up</Text>
      </Pressable>
    </View>
  );
};

const SignUp = ({ onSubmit }) => {
  const [createUser, result] = useSignUp();
  const submitForm = async ({ username, password }) => {
    await createUser({ username, password });
    onSubmit({ username, password });
  };

  if (result.loading) {
    return <Text>Loading...</Text>;
  }

  if (result.error) {
    return <Text color="error">Error: {result.error.message}</Text>;
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={submitForm}
    >
      {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignUp;
