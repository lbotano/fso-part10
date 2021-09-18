import React from 'react';
import { StyleSheet } from 'react-native';
import { useField } from 'formik';

import theme from '../theme';
import TextInput from './TextInput';
import Text from './Text';

const styles = StyleSheet.create({
  errorText: {
    marginBottom: 20,
  },
  inputError: {
    borderColor: theme.colors.error,
  },
});

const FormikTextInput = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name);
  const showError = meta.touched && meta.error;

  return (
    <>
      <TextInput
        onChangeText={value => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        error={showError}
        style={showError && styles.inputError}
        {...props}
      />
      {showError && <Text color="error" style={styles.errorText}>{meta.error}</Text>}
    </>
  );
};

export default FormikTextInput;
