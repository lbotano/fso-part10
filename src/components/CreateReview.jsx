import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';

import theme from '../theme';
import Text from './Text';
import FormikTextInput from './FormikTextInput';
import useReview from '../hooks/useReview';

const classes = StyleSheet.create({
  container: {
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
  ownerName: '',
  repositoryName: '',
  rating: 100,
  text: '',
};

const validationSchema = yup.object().shape({
  ownerName: yup
    .string()
    .required('Repository owner name is required'),
  repositoryName: yup
    .string()
    .required('Repository name is required'),
  rating: yup
    .number()
    .typeError('Invalid number')
    .transform((val) => Number(val))
    .min(0, 'Rating cannot be lower than 0')
    .max(100, 'Rating cannot be higher than 100')
    .integer('Number must be an integer')
    .required('Rating is required'),
  text: yup
    .string()
});


const ReviewForm = ({ onSubmit }) => {
  return (
    <View style={classes.container}>
      <FormikTextInput name="ownerName" placeholder="Repository owner name" />
      <FormikTextInput name="repositoryName" placeholder="Repository name" />
      <FormikTextInput
        name="rating"
        placeholder="Rating between 0 and 100"
        keyboardType="numeric"
        maxLength={3}
      />
      <FormikTextInput name="text" placeholder="Review" multiline />
      <Pressable style={classes.button} onPress={onSubmit}>
        <Text color="white" fontWeight="bold" fontSize="subheading">Create a review</Text>
      </Pressable>
    </View>
  );
};

const CreateReview = () => {
  const [createReview, result] = useReview();
  const submitReview = async ({
    ownerName,
    repositoryName,
    rating,
    text,
  }) => {
    const data = await createReview({
      ownerName,
      repositoryName,
      rating,
      text,
    });
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
      onSubmit={submitReview}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <ReviewForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default CreateReview;
